// src/modules/users/providers/HashProvider/models/IHashProvider.ts
export default interface IHashProvider {
  generateHash(payload: string): Promise<string>;
  compareHash(payload: string, hashed: string): Promise<boolean>;
}
