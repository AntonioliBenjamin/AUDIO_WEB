import { NodeMailerGateway } from "./../../adapters/gateways/NodeMailerGateway";
import { UuidGateway } from "./../../adapters/gateways/UuidGateway";
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
import { MongoDbOrganizationRepository } from '../../adapters/repositories/mongoDb/repositories/MongoDbOrganizationRepository';
const router = express.Router();
const mongoDbOrganizationRepository = new MongoDbOrganizationRepository()
const uuidGateway = new UuidGateway();
const nodeMailerGateway = new NodeMailerGateway();
const createOrganisation = new CreateOrganisation(
  mongoDbOrganizationRepository,
  uuidGateway
);
const updateOrganisation = new UpdateOrganisation(
  mongoDbOrganizationRepository
);
const sendInvitation = new SendInvitation(
  mongoDbOrganizationRepository,
  nodeMailerGateway
);

router.use(authorization);

router.post("/", async (req: UserAuthInfoRequest, res: Response) => {
  try {
    const organisation: OrganizationInput = {
      organizationName: req.body.organizationName,
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

    const organization = await createOrganisation.execute(organisation);

    return res.status(200).send(organization);
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.post("/sendInvitation", async (req: UserAuthInfoRequest, res: Response) => {
 try {
    const invitation = {
      username: req.body.username,
      email: req.body.email,
      token: req.user.id,
    };
    await sendInvitation.execute(invitation);

    return res.status(200).send({
      invitationSentTo: invitation.email,
    });
  } catch (err) {
    return res.sendStatus(400);
  }
});

router.patch("/", async (req: UserAuthInfoRequest, res: Response) => {
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

    const organization = await updateOrganisation.execute(updatedOrganisation);

    return res.status(200).send(organization);
  } catch (err) {
    return res.send(400);
  }
});

export { router as organizationRouter };
