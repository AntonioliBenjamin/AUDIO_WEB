import { SendInvitation } from "../usecases/organisation/SendInvitation";
import { Organization } from "../entities/Organization";
import {
  InMemoryOrganizationRepository,
  organizationDb,
} from "./repositories/InMemoryOrganisationRepository";
import { NodeMailerGateway } from "./gateways/NodeMailerGateway";

const nodeMailerGateway = new NodeMailerGateway();
const inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
const sendInvitation = new SendInvitation(
  inMemoryOrganizationRepository,
  nodeMailerGateway
);

describe("Unit - SendInvitation", () => {
  let organization: Organization;
  beforeAll(() => {
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
      invitationSent: [
        {
          username: "michel",
          email: "michel@gmail.com",
          addedDate: null,
        },
      ],
      status: "ADMIN",
    });
    organizationDb.set(organization.props.ownerId, organization);
  });

  it("should send invitation mail and save in Database", () => {
    const result = () =>
      sendInvitation.execute({
        username: "Victor",
        email: "victor@gmail.com",
        token: "12345",
      });
    expect(async () => {
      await result();
    }).resolves;
  });

  it("should send invitation mail without save in Database", async () => {
    const result = await sendInvitation.execute({
      username: "michel",
      email: "michel@gmail.com",
      token: "12345",
    });
    expect(result).resolves;
  });
});
