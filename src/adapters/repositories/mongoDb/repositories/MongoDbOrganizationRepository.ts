import { InMemoryOrganizationRepository } from './../../../../core/__test__/repositories/InMemoryOrganisationRepository';
import { OrganizationRepository } from '../../../../core/repositories/OrganisationRepository';
import { Organization, OrganizationProperties, InvitationSentProperties } from './../../../../core/entities/Organization';
import { OrganizationModel } from '../models/organization';

export const oraganizationDb = new Map<string, Organization>();

export class MongoDbOrganizationRepository implements OrganizationRepository {
    async getOrganisationByOwnerId(ownerId: string): Promise<Organization> {
        const organization = await OrganizationModel.findOne({ownerId : ownerId});
        if (!organization) {
            return null;
        }
        const organizationProperties : OrganizationProperties = {
            ownerId: organization.ownerId,
            id: organization.id,
            status: organization.status,
            invitationSent: organization.invitationSent,
            confirmedAt: organization.confirmedAt,
            createdAt: organization.createdAt,
            corporationName: organization.corporationName,
            street: organization.street,
            city: organization.city,
            organizationName: organization.organizationName,
            zipCode: organization.zipCode,
            country: organization.country,
            companyRegistrationNumber: organization.companyRegistrationNumber,
            vatNumber: organization.vatNumber,
            emoji: organization.emoji   
        }
        return new Organization(organizationProperties);
    }
    
     save(organization: Organization): Promise<void> {
        const organizationModel = new OrganizationModel(organization.props);
        console.log(organization)
        organizationModel.save().then(() => console.log('Saved'))
        return
    }
    
    async update(organization: Organization): Promise<void> {
        OrganizationModel.updateOne(
            {ownerId : organization.props.ownerId},
            {  
                organizationName: organization.props.organizationName,
                status: organization.props.status,
                corporationName: organization.props.corporationName,
                street: organization.props.street,
                city: organization.props.city,
                invitationSent: organization.props.invitationSent,
                zipCode: organization.props.zipCode,
                country: organization.props.country,
                companyRegistrationNumber:organization.props.companyRegistrationNumber,
                vatNumber: organization.props.vatNumber,
                emoji: organization.props.emoji
            },
            
            ).then(() => console.log('Updated'))
    }

    async invitationExist(ownerId: string, email: string): Promise<boolean> {
        const organization = await this.getOrganisationByOwnerId(ownerId)
        const values = Object.values(organization.props.invitationSent);
        const isAlreadySent = values.find(v => v.email === email); 
        
        if (!isAlreadySent) {
            return false
        }
        return true      
    }
}