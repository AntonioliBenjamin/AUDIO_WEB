import { model, Schema } from 'mongoose';
import { InvitationSentProperties } from '../../../../core/entities/Organization';


const organizationSchema = new Schema({
  id: {
    type: String,
  },
  organizationName: {
    type: String,
  },
  status: {
    type: String,
  },
  corporationName: {
    type: String,
  },
  street: {
    type: String,
  },
  city: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  country: {
    type: String,
  },
  companyRegistrationNumber: {
    type: String,
  },
  vatNumber: {
    type: String,
  },
  emoji: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  confirmedAt: {
    type: Date,
  },
  invitationSent: {
    type : Array<InvitationSentProperties>
  },
  ownerId: {
    type: String,
  },
  })
  
  export const OrganizationModel = model('Organization', organizationSchema) 


