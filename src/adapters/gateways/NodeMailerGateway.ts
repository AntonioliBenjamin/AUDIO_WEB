import nodemailer = require("nodemailer");
import { MailerGateway } from "../../core/gateways/MailerGateway";

export class NodeMailerGateway implements MailerGateway {

    async sendOrganisationInvitationByMail(email: string, organizationName: string): Promise<void>{
        let testAccount = await nodemailer.createTestAccount()

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
              user: testAccount.user, // generated ethereal user
              pass: testAccount.pass, // generated ethereal password
            },
          });

          let info = await transporter.sendMail({
            from: '"AUDIO WEB" <audio-web@no-reply.com>', // sender address
            to: email, // list of receivers
            subject: `You have a new invitation from ${organizationName}`, // Subject line
            text: `Hey! ${organizationName} wants you to join its organization `, // plain text body
           // html: "<b>Hello world?</b>", // html body
        
          });  
    }
}
