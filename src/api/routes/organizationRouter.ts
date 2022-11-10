import { UuidGateway } from "./../../adapters/gateways/UuidGateway";
import { InMemoryOrganizationRepository } from "./../../adapters/repositories/InMemoryOrganisationRepository";
import { CreateOrganisation, OrganizationInput } from "./../../core/usecases/organisation/CreateOrganisation";
import * as express from "express";
const router = express.Router();
import { Request, Response } from "express";
import { authorization } from "../midlewares/authorization";
import { UserAuthInfoRequest } from "./types/UserAuthInfoRequest ";
import { UpdateOrganisation, UpdateOrganisationInput } from "../../core/usecases/organisation/UpdateOrganisation";
const uuidGateway = new UuidGateway();
const inMemoryOrganizationRepository = new InMemoryOrganizationRepository();
const createOrganisation = new CreateOrganisation(inMemoryOrganizationRepository, uuidGateway);
const updateOrganisation = new UpdateOrganisation(inMemoryOrganizationRepository)

router.use(authorization)

router.post("/", (req: UserAuthInfoRequest, res: Response) => {
  try {
    const body: OrganizationInput = {
      name: req.body.organizationName,
      street: req.body.street,
      city: req.body.city,
      zipCode: req.body.zipCode,
      country: req.body.country,
      companyRegistrationNumber: req.body.companyRegistrationNumber,
      vatNumber: req.body.vatNumber,
      emoji: req.body.emoji,
      corporationName: req.body.corporationName,
      token: req.user.uid,
    };
    
    const organization = createOrganisation.execute(body);
    
    return res.status(200).send(organization);
  } catch (err) {
    return res.status(400).send({
      message: err.message,
    });
  }
});

router.patch("/", (req: UserAuthInfoRequest, res: Response) => {
  const body: UpdateOrganisationInput = {
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
  token: req.user.uid
}

const organization = updateOrganisation.execute(body)

return res.status(200).send(organization);
});

export { router as organizationRouter };
