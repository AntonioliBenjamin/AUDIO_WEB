import { SentMessageInfo } from "nodemailer";

export interface MailerGateway {
    sendOrganisationInvitationByMail(email: string, organizationName: string): Promise<SentMessageInfo>
}

