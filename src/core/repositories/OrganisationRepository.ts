import { Organization, OrganizationProperties } from './../entities/Organization';

export interface OrganizationRepository {
    invitationExist(ownerId: string, email: string): Promise<boolean> | boolean; 
    save(organisation: Organization): Promise<void> | void;
    getOrganisationByOwnerId(ownerId: string): Promise<Organization> | Organization;
    update(organization: Organization): Promise<void> 
}