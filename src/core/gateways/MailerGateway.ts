export interface MailerGateway {
    sendOrganisationInvitationByMail(email: string, organizationName: string): Promise<void>
}

