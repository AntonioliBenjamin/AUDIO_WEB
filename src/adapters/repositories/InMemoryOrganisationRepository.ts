import { Organization } from "../../core/entities/Organization";
import { OrganizationRepository } from "../../core/repositories/OrganisationRepository";

export const oraganizationDb = new Map<string, Organization>();

export class InMemoryOrganizationRepository implements OrganizationRepository {
    
    getOrganisationByOwnerId(ownerId: string): Organization {
        return oraganizationDb.get(ownerId);
    }
    save(organization: Organization): void {
        oraganizationDb.set(organization.props.ownerId, organization);
    }
}