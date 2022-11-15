import { SendInvitation } from '../usecases/organisation/SendInvitation';
import { Organization } from '../entities/Organization';
import {  InMemoryOrganizationRepository, oraganizationDb } from './repositories/InMemoryOrganisationRepository';
import { NodeMailerGateway } from './gateways/NodeMailerGateway';

const nodeMailerGateway = new NodeMailerGateway()
const inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
const sendInvitation = new SendInvitation(inMemoryOrganizationRepository, nodeMailerGateway)

oraganizationDb.set("12345", new Organization({
    id: "999999",
    organizationName: "johnDoeOrganisation",
    corporationName: "johnDoeCorporation",
    street: "12 chemin de la calle",
    city: "NY",
    zipCode: "544887",
    country: "USA",
    companyRegistrationNumber: "456454854",
    vatNumber: "465456465",
    emoji: "url:http://....",
    confirmedAt: null,
    createdAt: null,
    ownerId: "12345",
    invitationSent: [{
        username: "michel",
        email: "michel@gmail.com",
        addedDate: null,
    }],
    status: "ADMIN"
}))

describe('Unit - SendInvitation', () => {

    let organization : Organization;
    beforeAll( () => {
        organization = new Organization({
            id: "999999",
            organizationName: "johnDoeOrganisation",
            corporationName: "johnDoeCorporation",
            street: "12 chemin de la calle",
            city: "NY",
            zipCode: "544887",
            country: "USA",
            companyRegistrationNumber: "456454854",
            vatNumber: "465456465",
            emoji: "url:http://....",
            confirmedAt: null,
            createdAt: null,
            ownerId: "12345",
            invitationSent: [{
                username: "michel",
                email: "michel@gmail.com",
                addedDate: null,
            }],
            status: "ADMIN"
          });
        oraganizationDb.set(organization.props.id, organization);
        })

    it('should sendInvitation and save in Database', async () => {
        const result = await sendInvitation.execute({
            username: "Victor",
            email: "victor@gmail.com",
            token: "12345"
        })
         expect(result).resolves
    })
    it('should sendInvitation without save in Database', async () => {
        const result = await sendInvitation.execute({
            username: "michel",
            email: "michel@gmail.com",
            token: "12345"
        })
        expect(result).resolves
    })
})
