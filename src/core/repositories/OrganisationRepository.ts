import { Organization, OrganizationProperties } from './../entities/Organization';

export interface OrganizationRepository {
    invitationExist(ownerId: string, email: string): boolean; 
    save(organisation: Organization): void;
    getOrganisationByOwnerId(ownerId: string): Organization;
}