import { OrganizationRepository } from './../../repositories/OrganisationRepository';
import { Organization } from './../../entities/Organization';
import { UseCase } from './../UseCase';

export type UpdateOrganisationInput = {
    organizationName: string,
    status: string,
    corporationName: string,
    street: string,
    city: string,
    zipCode: string,
    country: string,
    companyRegistrationNumber: string,
    vatNumber: string,
    emoji?: string,
    token: string,
}

export class UpdateOrganisation implements UseCase<UpdateOrganisationInput, Organization> {
    
    constructor(
        private readonly organizationRepository: OrganizationRepository
    ) {}    
    
    
    execute(input: UpdateOrganisationInput): Organization  {
        const organization = this.organizationRepository.getOrganisationByOwnerId(input.token)
    
         organization.update({
            organizationName: input.organizationName,
            status: input.status,
            corporationName: input.corporationName,
            street: input.street,
            city: input.city,
            zipCode: input.zipCode,
            country: input.country,
            companyRegistrationNumber: input.companyRegistrationNumber,
            vatNumber: input.vatNumber,
            emoji: input.emoji
        })

        this.organizationRepository.save(organization)
        return organization
    }
}