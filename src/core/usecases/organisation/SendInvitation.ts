import { MailerGateway } from './../../gateways/MailerGateway';
import { OrganizationRepository } from '../../repositories/OrganisationRepository';
import { UseCase } from './../UseCase';

export type SendInvitationInput = {
    username: string,
    email: string,
    token: string
}

export class SendInvitation implements UseCase<SendInvitationInput, Promise<void>> {

    constructor (
        private readonly organizationRepository: OrganizationRepository,
        private readonly mailerGateway: MailerGateway
    ) {}

    async execute(input: SendInvitationInput): Promise<void> {
        const organization = await this.organizationRepository.getOrganisationByOwnerId(input.token)
        const isAlreadySent = await this.organizationRepository.invitationExist(input.token, input.email)
       
        if (!isAlreadySent) {         
        organization.props.invitationSent.push({
            username: input.username,
            email: input.email,
            addedDate: new Date(),   
        })
       
        await this.organizationRepository.update(organization)
        }

        await this.mailerGateway.sendOrganisationInvitation(input.email, organization.props.organizationName)  
        return 
    }
}