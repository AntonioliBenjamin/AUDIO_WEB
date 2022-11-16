import { Organization } from "../entities/Organization";
import { UpdateOrganisation } from "../usecases/organisation/UpdateOrganisation";
import {
  InMemoryOrganizationRepository,
  organizationDb,
} from "./repositories/InMemoryOrganisationRepository";

const inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
const updateOrganization = new UpdateOrganisation(inMemoryOrganizationRepository);

// oraganizationDb.set(
//   "12345",
//   new Organization({
//     id: "999999",
//     organizationName: "johnDoeOrganisation",
//     corporationName: "johnDoeCorporation",
//     street: "12 chemin de la calle",
//     city: "NY",
//     zipCode: "544887",
//     country: "USA",
//     companyRegistrationNumber: "456454854",
//     vatNumber: "465456465",
//     emoji: "url:http://....",
//     confirmedAt: null,
//     createdAt: null,
//     ownerId: "12345",
//     invitationSent: [],
//     status: "ADMIN",
//   })
// );

describe("Unit - UpdateOrganization", () => {

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
      organizationDb.set(organization.props.ownerId, organization);
      })
      
  it("should update organization", () => {
    const result = updateOrganization.execute({
      organizationName: "michelOrganization",
      status: "USER",
      corporationName: "MichelCorporations",
      street: "1201 wall street",
      city: "Toronto",
      zipCode: "1244885",
      country: "Canada",
      companyRegistrationNumber: "898954768",
      vatNumber: "56568466",
      emoji: "url:http://....",
      token: "12345",
    });
    expect(result.props.organizationName).toEqual("michelOrganization");
    expect(result.props.status).toEqual("USER");
    expect(result.props.corporationName).toEqual("MichelCorporations");
    expect(result.props.street).toEqual("1201 wall street");
    expect(result.props.city).toEqual("Toronto");
    expect(result.props.zipCode).toEqual("1244885");
    expect(result.props.country).toEqual("Canada");
    expect(result.props.companyRegistrationNumber).toEqual("898954768");
    expect(result.props.vatNumber).toEqual("56568466");
    expect(result.props.emoji).toEqual("url:http://....");
    expect(result.props.id).toEqual("999999");
    expect(result.props.ownerId).toEqual("12345");
    expect(result.props.invitationSent).toEqual([]);
  });
  it("should throw Organization not found", () => {
    const result = () =>
      updateOrganization.execute({
        organizationName: "michelOrganization",
        status: "USER",
        corporationName: "MichelCorporations",
        street: "1201 wall street",
        city: "Toronto",
        zipCode: "1244885",
        country: "Canada",
        companyRegistrationNumber: "898954768",
        vatNumber: "56568466",
        emoji: "url:http://....",
        token: "INVALID_TOKEN",
      });
    expect(() => {
      result();
    }).toThrow();
  });
});
