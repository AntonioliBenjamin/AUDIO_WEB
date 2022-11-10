import { Organization, OrganizationProperties } from "../../core/entities/Organization";
import { OrganizationRepository } from "../../core/repositories/OrganisationRepository";

export const oraganizationDb = new Map();

export class InMemoryOrganizationRepository implements OrganizationRepository {
    
    getOrganisationByOwnerId(ownerId: string): OrganizationProperties {
        return oraganizationDb.get(ownerId);
    }
    save(organization: Organization): void {
        oraganizationDb.set(organization.props.ownerId, organization.props);
    }
}