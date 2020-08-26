// src/shared/container/providers/MailTemplateProvider/fakes/FakeMailTemplateProvider.ts
import IMailTemplateProvider from '../models/IMailTemplateProvider';

export default class FakeMailTemplateProvider implements IMailTemplateProvider {
  public async parse(): Promise<string> {
    return 'Mail template';
  }
}
