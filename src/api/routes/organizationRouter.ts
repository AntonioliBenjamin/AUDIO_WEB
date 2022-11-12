import { NodeMailerGateway } from "./../../adapters/gateways/NodeMailerGateway";
import { UuidGateway } from "./../../adapters/gateways/UuidGateway";
import { InMemoryOrganizationRepository } from "./../../adapters/repositories/InMemoryOrganisationRepository";
import {
  CreateOrganisation,
  OrganizationInput,
} from "./../../core/usecases/organisation/CreateOrganisation";
import * as express from "express";
import { Request, Response } from "express";
import { authorization } from "../midlewares/authorization";
import { UserAuthInfoRequest } from "./types/UserAuthInfoRequest ";
import {
  UpdateOrganisation,
  UpdateOrganisationInput,
} from "../../core/usecases/organisation/UpdateOrganisation";
import { SendInvitation } from "../../core/usecases/organisation/SendInvitation";
const router = express.Router();
const uuidGateway = new UuidGateway();
const nodeMailerGateway = new NodeMailerGateway();
const inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
const createOrganisation = new CreateOrganisation(
  inMemoryOrganizationRepository,
  uuidGateway
);
const updateOrganisation = new UpdateOrganisation(
  inMemoryOrganizationRepository
);
const sendInvitation = new SendInvitation(
  inMemoryOrganizationRepository,
  nodeMailerGateway
);

router.use(authorization);

router.post("/", (req: UserAuthInfoRequest, res: Response) => {
  try {
    const organisation: OrganizationInput = {
      name: req.body.organizationName,
      street: req.body.street,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
      companyRegistrationNumber: req.body.companyRegistrationNumber,
      vatNumber: req.body.vatNumber,
      emoji: req.body.emoji,
      corporationName: req.body.corporationName,
      token: req.user.id,
    };

    const organization = createOrganisation.execute(organisation);

    return res.status(200).send(organization);
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/sendInvitation", (req: UserAuthInfoRequest, res: Response) => {
  try {
    const invitation = {
      username: req.body.username,
      email: req.body.email,
      token: req.user.id,
    };
    sendInvitation.execute(invitation);

    return res.status(200).send({
      invitationSentTo: invitation.email,
    });
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.patch("/", (req: UserAuthInfoRequest, res: Response) => {
  try {
    const updatedOrganisation: UpdateOrganisationInput = {
      organizationName: req.body.organizationName,
      status: req.body.status,
      corporationName: req.body.corporationName,
      street: req.body.street,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
      companyRegistrationNumber: req.body.companyRegistrationNumber,
      vatNumber: req.body.vatNumber,
      emoji: req.body.emoji,
      token: req.user.id,
    };

    const organization = updateOrganisation.execute(updatedOrganisation);

    return res.status(200).send(organization);
  } catch (err) {
    return res.send(400);
  }
});

export { router as organizationRouter };
