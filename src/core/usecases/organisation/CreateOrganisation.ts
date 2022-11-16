import { OrganizationRepository } from './../../repositories/OrganisationRepository';
import { Organization } from './../../entities/Organization';
import { UseCase } from "../UseCase";
import { IdGateway } from '../../gateways/IdGateway';

export type OrganizationInput = {
    organizationName: string,
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
    
    async execute(input: OrganizationInput) {
       const isOrganizationExist = await this.organizationRepository.getOrganisationByOwnerId(input.token)
       if (isOrganizationExist) {
        throw new Error('ORGANIZATION ALREADY EXIST')
       }

       const organization = Organization.create({
        id: this.idGateway.generate(),
        organizationName: input.organizationName,
        corporationName: input.corporationName,
        street: input.street,
        city: input.city,
        zipCode: input.zipCode,
        country: input.country,
        companyRegistrationNumber: input.companyRegistrationNumber,
        vatNumber: input.vatNumber,
        emoji: input.emoji,
        ownerId: input.token,
       })

        await this.organizationRepository.create(organization)

        return organization
    }
}