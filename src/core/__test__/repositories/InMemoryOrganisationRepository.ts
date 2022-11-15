import { Organization } from '../../entities/Organization';
import { OrganizationRepository } from '../../repositories/OrganisationRepository';

export const oraganizationDb = new Map<string, Organization>();

export class InMemoryOrganizationRepository implements OrganizationRepository {
    
    getOrganisationByOwnerId(ownerId: string): Organization {
        return oraganizationDb.get(ownerId);
    }
    
    save(organization: Organization): void {
        oraganizationDb.set(organization.props.ownerId, organization);
    }

    invitationExist(ownerId: string, email: string): boolean {
        const organization = this.getOrganisationByOwnerId(ownerId)
        const values = Object.values(organization.props.invitationSent);
        const isAlreadySent = values.find(v => v.email === email);
        if (!isAlreadySent) {
            return false
        }
        return true      
    }
}