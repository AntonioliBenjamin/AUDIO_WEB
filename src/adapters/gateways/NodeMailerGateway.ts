import { SentMessageInfo } from "nodemailer";
import nodemailer = require("nodemailer");
import { MailerGateway } from "../../core/gateways/MailerGateway";
const password= process.env.ETHEREAL_PASSWORD

export class NodeMailerGateway implements MailerGateway {

    async sendOrganisationInvitation(email: string, organizationName: string): Promise<SentMessageInfo> {
        await nodemailer.createTestAccount()

        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'jesus.christiansen19@ethereal.email',
            pass: 'jHbDQ9umPxTnTt9ggy'
          }
      });
          const info = await transporter.sendMail({
            from: '"AUDIO WEB" <christian86@ethereal.email>',
            to: `${email}`,
            subject: `You have a new invitation from ${organizationName}`,
            text: `Hey! ${organizationName} wants you to join its organization `, 
          }) 
      }
    }