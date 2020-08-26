// src/shared/container/providers/StorageProvider/models/IStorageProvider.ts
export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
