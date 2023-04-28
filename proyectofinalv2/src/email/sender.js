import { createTransport } from 'nodemailer';
import { NODEMAILER_CONFIG } from '../../config/config.js';

class EmailSender {
    constructor(config) {
        this.nodemailerClient = createTransport(config)
    }

    async send(mailOptions) {
        try {
            return await this.nodemailerClient.sendMail(mailOptions)
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const emailSender = new EmailSender(NODEMAILER_CONFIG)