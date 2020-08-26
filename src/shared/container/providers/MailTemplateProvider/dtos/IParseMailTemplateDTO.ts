// src/shared/container/providers/MailTemplateProvider/dtos/IParseMailTemplateDTO.ts
interface ITemplateVariables {
  [key: string]: string | number;
}

export default interface IParseMailTemplateDTO {
  file: string;
  variables: ITemplateVariables;
}
