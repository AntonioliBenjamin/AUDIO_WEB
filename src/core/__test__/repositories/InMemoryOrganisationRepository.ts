import { Organization } from '../../entities/Organization';
import { OrganizationRepository } from '../../repositories/OrganisationRepository';

export const organizationDb = new Map<string, Organization>();

export class InMemoryOrganizationRepository implements OrganizationRepository {


    async create(organization: Organization): Promise<Organization> {
        organizationDb.set(organization.props.ownerId, organization);
        return Promise.resolve(organization);
    }

    async getOrganisationByOwnerId(ownerId: string): Promise<Organization> {
        const organization = await organizationDb.get(ownerId);
        return Promise.resolve(organization);
    }
    


    async invitationExist(ownerId: string, email: string): Promise<boolean> {
        const organization = await this.getOrganisationByOwnerId(ownerId)
        const values = Object.values(organization.props.invitationSent);
        const isAlreadySent = values.find(v => v.email === email);
        if (!isAlreadySent) {
            return Promise.reject(false)
        }
        return Promise.resolve(true)      
    }    
    
    async update(organization: Organization): Promise<Organization> {
        const organizationFounded = await this.getOrganisationByOwnerId(organization.props.ownerId);
        await organizationFounded.update({
            city: organization.props.city,
            companyRegistrationNumber: organization.props.companyRegistrationNumber,
            corporationName: organization.props.corporationName,
            country: organization.props.country,
            organizationName: organization.props.organizationName,
            status: organization.props.status,
            street: organization.props.street,
            vatNumber: organization.props.vatNumber,
            zipCode: organization.props.zipCode,
            emoji: organization.props.emoji,
        })
        organizationDb.set(organizationFounded.props.ownerId, organizationFounded);  
        return Promise.resolve(organizationFounded);
    }
}