import { OrganizationRepository } from './../../repositories/OrganisationRepository';
import { Organization } from './../../entities/Organization';
import { UseCase } from "../UseCase";
import { IdGateway } from '../../gateways/IdGateway';

export type OrganizationInput = {
    name: string,
    corporationName: string,
    street: string,
    city: string,
    zipCode: string,
    country: string,
    companyRegistrationNumber: string,
    vatNumber: string,
    emoji?: string,
    token: string
}

export class CreateOrganisation implements UseCase<OrganizationInput, Organization> {
    
    constructor(
        private readonly organizationRepository: OrganizationRepository,
        private readonly idGateway: IdGateway,
    ) {}
    
    execute(input: OrganizationInput) {
       const isOrganizationExist = this.organizationRepository.getOrganisationByOwnerId(input.token)
       if (isOrganizationExist) {
        throw new Error('USER ALREADY HAS AN ORGANIZATION')
       }

       const organization = Organization.create({
        id: this.idGateway.generate(),
        organizationName: input.name,
        corporationName: input.corporationName,
        street: input.street,
        city: input.city,
        zipCode: input.zipCode,
        country: input.country,
        companyRegistrationNumber: input.companyRegistrationNumber,
        vatNumber: input.vatNumber,
        emoji: input.emoji,
        confirmedAt: null,
        createdAt: new Date(),
        status: 'admin',
        ownerId: input.token,
       })

        this.organizationRepository.save(organization)

        return organization
    }
}