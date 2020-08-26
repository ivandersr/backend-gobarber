// src/shared/container/providers/MailTemplateProvider/models/IMailTemplateProvider.ts
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

export default interface IMailTemplateProvider {
  parse(data: IParseMailTemplateDTO): Promise<string>;
}
