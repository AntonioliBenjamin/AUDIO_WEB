import { oraganizationDb } from './../../../adapters/repositories/InMemoryOrganisationRepository';
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
        const organization = this.organizationRepository.getOrganisationByOwnerId(input.token)
        await this.mailerGateway.sendOrganisationInvitationByMail(input.email, organization.props.organizationName)
        
        
       const saveInvitation = {
            username: input.username,
            email: input.email,
            addedDate: new Date(),   
        }

        organization.addInvitation(saveInvitation)
        this.organizationRepository.save(organization)

        console.log(organization.props.invitationSent)
        return 
    }

    
}