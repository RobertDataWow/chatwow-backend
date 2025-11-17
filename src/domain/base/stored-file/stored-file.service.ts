import { Injectable } from '@nestjs/common';

import { StoredFile } from './stored-file.domain';
import { StoredFileMapper } from './stored-file.mapper';
import { StoredFileRepo } from './stored-file.repo';

@Injectable()
export class StoredFileService {
  constructor(private repo: StoredFileRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(storedFile: StoredFile) {
    this._validate(storedFile);

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

  private _validate(_storedFile: StoredFile) {
    // validation rules can be added here
  }
}
