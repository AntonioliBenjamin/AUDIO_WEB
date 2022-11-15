import { SentMessageInfo } from "nodemailer";

export interface MailerGateway {
    sendOrganisationInvitation(email: string, organizationName: string): Promise<SentMessageInfo>
}

