import { Organization, OrganizationProperties } from './../entities/Organization';

export interface OrganizationRepository {
    save(organisation: Organization): void;
    getOrganisationByOwnerId(ownerId: string): Organization;
}