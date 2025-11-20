import { Injectable } from '@nestjs/common';
import { Writable } from 'type-fest';

import { StorageService } from '@infra/global/storage/storage.service';

import { streamToBuffer } from '@shared/common/common.buffer';
import { uuidV7 } from '@shared/common/common.crypto';
import { DayjsDuration } from '@shared/common/common.type';

import { StoredFile } from './stored-file.domain';
import { StoredFileMapper } from './stored-file.mapper';
import { StoredFileRepo } from './stored-file.repo';
import { getStoredFileKey } from './stored-file.util';
import { GetPresignUploadUrlOpts } from './types/stored-file.common.type';

@Injectable()
export class StoredFileService {
  constructor(
    private repo: StoredFileRepo,
    private storageService: StorageService,
  ) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(storedFile: StoredFile) {
    this._validate(storedFile);

    await this.setMetaInfo(storedFile);
    if (!storedFile.isPersist) {
      await this.repo.create(storedFile);
    } else {
      await this.repo.update(storedFile.id, storedFile);
    }

    storedFile.setPgState(StoredFileMapper.toPg);
  }

  async saveBulk(storedFiles: StoredFile[]) {
    return Promise.all(storedFiles.map((s) => this.save(s)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async deleteRelated(storedFile: StoredFile) {
    await this.repo.deleteRelated(storedFile.ownerId);
    await this.storageService.remove(storedFile.keyPath);
  }

  async deleteRelatedBulk(storedFiles: StoredFile[]) {
    await Promise.all(
      storedFiles.map((storedFile) => this.deleteRelated(storedFile)),
    );
  }

  private _validate(_storedFile: StoredFile) {
    // validation rules can be added here
  }

  async getPresignUploadUrlBulk(amount: number, opts: GetPresignUploadUrlOpts) {
    const amountArray = Array.from({ length: amount }).fill(0);

    return Promise.all(
      amountArray.map(async () =>
        this.getPresignUploadUrl({
          ownerTable: opts.ownerTable,
          isPublic: opts.isPublic,
        }),
      ),
    );
  }

  async getPresignUploadUrl(opts: GetPresignUploadUrlOpts) {
    const id = uuidV7();

    const key = getStoredFileKey({
      id,
      ownerTable: opts.ownerTable,
      isPublic: opts.isPublic,
    });
    const presignUrl = await this.storageService.createUploadPresign(key);

    return {
      id,
      presignUrl,
    };
  }

  async getStream(storedFile: StoredFile) {
    return this.storageService.get(storedFile.keyPath);
  }

  async getBuffer(storedFile: StoredFile) {
    const readable = await this.getStream(storedFile);
    if (!readable) {
      return null;
    }

    const buffer = await streamToBuffer(readable);
    return buffer;
  }

  async setMetaInfo(storedFile: StoredFile) {
    if (!storedFile.isFileChanged()) {
      return;
    }

    const { mimetype, checksum, sizeBytes } =
      await this.storageService.getObjectMeta(storedFile.keyPath);
    const writeStoredFile = storedFile as Writable<typeof storedFile>;

    writeStoredFile.mimeType = mimetype;
    writeStoredFile.checksum = checksum;
    if (sizeBytes) {
      writeStoredFile.filesizeByte = sizeBytes;
    }

    await this.setPresigned(storedFile);
  }

  async setPresigned(
    storedFile: StoredFile,
    opts?: { expiresIn?: DayjsDuration },
  ) {
    if (!storedFile.isFileChanged()) {
      return;
    }

    const presignUrl = await this.storageService.getPresigned(
      storedFile.keyPath,
      { expiresIn: opts?.expiresIn || { days: 1 } },
    );

    const writeStoredFile = storedFile as Writable<typeof storedFile>;
    writeStoredFile.presignUrl = presignUrl;
  }
}
