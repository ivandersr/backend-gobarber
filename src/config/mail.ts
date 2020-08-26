// src/config/mail.ts
interface IMailConfig {
  driver: 'ethereal' | 'ses';
  defaults: {
    from: {
      email: string;
      name: string;
    };
  };
}

export default {
  driver: process.env.MAIL_DRIVER || 'ethereal',
  defaults: {
    from: {
      email: 'ivandersalvadorruiz@gmail.com',
      name: 'Ivander da Devis',
    },
  },
} as IMailConfig;
