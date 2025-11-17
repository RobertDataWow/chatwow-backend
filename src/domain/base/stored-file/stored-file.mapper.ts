import { StoredFile } from './stored-file.domain';
import type {
  StoredFileJson,
  StoredFilePg,
  StoredFilePlain,
} from './types/stored-file.domain.type';

export class StoredFileMapper {
  static fromPg(pg: StoredFilePg): StoredFile {
    const plain: StoredFilePlain = {
      id: pg.id,
      refName: pg.ref_name,
      keyPath: pg.key_path,
      ownerTable: pg.owner_table,
      ownerId: pg.owner_id,
      filename: pg.filename,
      filesizeByte: pg.filesize_byte ? Number(pg.filesize_byte) : null,
      storageName: pg.storage_name,
      presignUrl: pg.presign_url,
      isPublic: pg.is_public,
      createdAt: pg.created_at ? new Date(pg.created_at) : null,
      updatedAt: pg.updated_at ? new Date(pg.updated_at) : null,
      mimeType: pg.mime_type,
      extension: pg.extension,
      checksum: pg.checksum,
      expireAt: pg.expire_at ? new Date(pg.expire_at) : null,
    };

    return new StoredFile(plain);
  }

  static fromPgWithState(pg: StoredFilePg): StoredFile {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: StoredFilePlain): StoredFile {
    const plain: StoredFilePlain = {
      id: plainData.id,
      refName: plainData.refName,
      keyPath: plainData.keyPath,
      ownerTable: plainData.ownerTable,
      ownerId: plainData.ownerId,
      filename: plainData.filename,
      filesizeByte: plainData.filesizeByte,
      storageName: plainData.storageName,
      presignUrl: plainData.presignUrl,
      isPublic: plainData.isPublic,
      createdAt: plainData.createdAt,
      updatedAt: plainData.updatedAt,
      mimeType: plainData.mimeType,
      extension: plainData.extension,
      checksum: plainData.checksum,
      expireAt: plainData.expireAt,
    };

    return new StoredFile(plain);
  }

  static fromJson(json: StoredFileJson): StoredFile {
    const plain: StoredFilePlain = {
      id: json.id,
      refName: json.refName,
      keyPath: json.keyPath,
      ownerTable: json.ownerTable,
      ownerId: json.ownerId,
      filename: json.filename,
      filesizeByte: json.filesizeByte,
      storageName: json.storageName,
      presignUrl: json.presignUrl,
      isPublic: json.isPublic,
      createdAt: json.createdAt,
      updatedAt: json.updatedAt,
      mimeType: json.mimeType,
      extension: json.extension,
      checksum: json.checksum,
      expireAt: json.expireAt,
    };

    return new StoredFile(plain);
  }

  static toPg(storedFile: StoredFile): StoredFilePg {
    return {
      id: storedFile.id,
      ref_name: storedFile.refName,
      key_path: storedFile.keyPath,
      owner_table: storedFile.ownerTable,
      owner_id: storedFile.ownerId,
      filename: storedFile.filename,
      filesize_byte: storedFile.filesizeByte
        ? String(storedFile.filesizeByte)
        : null,
      storage_name: storedFile.storageName,
      presign_url: storedFile.presignUrl,
      is_public: storedFile.isPublic,
      created_at: storedFile.createdAt?.toISOString() || null,
      updated_at: storedFile.updatedAt?.toISOString() || null,
      mime_type: storedFile.mimeType,
      extension: storedFile.extension,
      checksum: storedFile.checksum,
      expire_at: storedFile.expireAt?.toISOString() || null,
    };
  }

  static toPlain(storedFile: StoredFile): StoredFilePlain {
    return {
      id: storedFile.id,
      refName: storedFile.refName,
      keyPath: storedFile.keyPath,
      ownerTable: storedFile.ownerTable,
      ownerId: storedFile.ownerId,
      filename: storedFile.filename,
      filesizeByte: storedFile.filesizeByte,
      storageName: storedFile.storageName,
      presignUrl: storedFile.presignUrl,
      isPublic: storedFile.isPublic,
      createdAt: storedFile.createdAt,
      updatedAt: storedFile.updatedAt,
      mimeType: storedFile.mimeType,
      extension: storedFile.extension,
      checksum: storedFile.checksum,
      expireAt: storedFile.expireAt,
    };
  }

  static toJson(storedFile: StoredFile): StoredFileJson {
    return {
      id: storedFile.id,
      refName: storedFile.refName,
      keyPath: storedFile.keyPath,
      ownerTable: storedFile.ownerTable,
      ownerId: storedFile.ownerId,
      filename: storedFile.filename,
      filesizeByte: storedFile.filesizeByte,
      storageName: storedFile.storageName,
      presignUrl: storedFile.presignUrl,
      isPublic: storedFile.isPublic,
      createdAt: storedFile.createdAt,
      updatedAt: storedFile.updatedAt,
      mimeType: storedFile.mimeType,
      extension: storedFile.extension,
      checksum: storedFile.checksum,
      expireAt: storedFile.expireAt,
    };
  }

  static toResponse(storedFile: StoredFile) {
    return {
      id: storedFile.id,
      refName: storedFile.refName,
      keyPath: storedFile.keyPath,
      ownerTable: storedFile.ownerTable,
      ownerId: storedFile.ownerId,
      filename: storedFile.filename,
      filesizeByte: storedFile.filesizeByte,
      storageName: storedFile.storageName,
      presignUrl: storedFile.presignUrl,
      isPublic: storedFile.isPublic,
      createdAt: storedFile.createdAt?.toISOString() || null,
      updatedAt: storedFile.updatedAt?.toISOString() || null,
      mimeType: storedFile.mimeType,
      extension: storedFile.extension,
      checksum: storedFile.checksum,
      expireAt: storedFile.expireAt?.toISOString() || null,
    };
  }
}
