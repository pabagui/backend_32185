
import { createTransport } from 'nodemailer';
import { NODEMAILER_CONFIG } from './config.js';
import { logger } from '../logger/pino.js';


class SendEmail {
  constructor() {
    this.nodemailerClient = createTransport(NODEMAILER_CONFIG)
  }
  async send(mailOptions) {
    try {
      return await this.nodemailerClient.sendMail(mailOptions)
    } catch (err) {
      logger.error(err)
      throw new Error(err.message);
    }
  }
}

export const sendEmail = new SendEmail()