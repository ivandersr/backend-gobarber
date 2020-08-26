// src/config/auth.ts
export default {
  jwt: {
    secret: process.env.APP_SECRET || '750a63986eef52bce891ceef54b58d48',
    expiresIn: '1d',
  },
};
