import { Organization } from './../entities/Organization';
import { CreateOrganisation } from '../usecases/organisation/CreateOrganisation';
import { UuidGateway } from './../__test__/gateways/UuidGateway';
import { InMemoryOrganizationRepository, oraganizationDb } from './repositories/InMemoryOrganisationRepository';

const uuidgateway = new UuidGateway()
const inMemoryOrganizationRepository = new InMemoryOrganizationRepository()
const createOrganisation = new CreateOrganisation(inMemoryOrganizationRepository, uuidgateway)


describe('Unit - CreateOrganisation' , () => {

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
            invitationSent: [],
            status: "ADMIN"
          });
        oraganizationDb.set(organization.props.ownerId, organization);
        })

    it('should create a new organisation', () => {
        const result = createOrganisation.execute({
            organizationName: "orga",
            corporationName: "organization",
            street: "147 rue de la rue",
            city: "tokyo",
            zipCode: "58774",
            country: "Japon",
            companyRegistrationNumber: "456454854",
            vatNumber: "465456465",
            emoji: "url:http://....",
            token: "4564546654456"
        })
        expect(result.props.organizationName).toEqual("orga");
        expect(result.props.corporationName).toEqual("organization");
        expect(result.props.street).toEqual("147 rue de la rue");
        expect(result.props.city).toEqual("tokyo");
        expect(result.props.zipCode).toEqual("58774");
        expect(result.props.country).toEqual("Japon");
        expect(result.props.companyRegistrationNumber).toEqual("456454854");
        expect(result.props.vatNumber).toEqual("465456465");
        expect(result.props.emoji).toEqual("url:http://....");
    }) 

    it('Shoul throw ORGANIZATION ALREADY EXIST', () => {
        const result = () => createOrganisation.execute({
            organizationName: "johnDoeOrganisation",
            corporationName: "johnDoeCorporation",
            street: "12 chemin de la calle",
            city: "NY",
            zipCode: "544887",
            country: "USA",
            companyRegistrationNumber: "456454854",
            vatNumber: "465456465",
            emoji: "url:http://....",
            token: "12345"
        })
        expect(() => {
            result()
        }).toThrow()
    })
})