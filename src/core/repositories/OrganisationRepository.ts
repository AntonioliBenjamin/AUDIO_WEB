import { Organization } from "./../entities/Organization";

export interface OrganizationRepository {
  invitationExist(ownerId: string, email: string): Promise<boolean>;
  create(organisation: Organization): Promise<Organization>;
  getOrganisationByOwnerId(ownerId: string): Promise<Organization>;
  update(organization: Organization): Promise<Organization>;
}
