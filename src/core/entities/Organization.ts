export type OrganizationProperties = {
  id: string;
  organizationName: string;
  status: string;
  corporationName: string;
  street: string;
  city: string;
  zipCode: string;
  country: string;
  companyRegistrationNumber: string;
  vatNumber: string;
  emoji?: string;
  createdAt: Date;
  confirmedAt: Date;
  invitationSent: Array<InvitationSentProperties>;
  ownerId: string;
};

export type InvitationSentProperties = {
  username: string;
  email: string;
  addedDate: Date;
};

export class Organization {
  props: OrganizationProperties;

  constructor(props: OrganizationProperties) {
    this.props = props;
  }

  static create(props: {
    id: string;
    organizationName: string;
    corporationName: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    companyRegistrationNumber: string;
    vatNumber: string;
    emoji?: string;

    ownerId: string;
  }) {
    return new Organization({
      id: props.id,
      organizationName: props.organizationName,
      status: "admin",
      corporationName: props.corporationName,
      street: props.street,
      city: props.city,
      zipCode: props.zipCode,
      country: props.country,
      companyRegistrationNumber: props.companyRegistrationNumber,
      vatNumber: props.vatNumber,
      emoji: props.emoji,
      createdAt: new Date(),
      confirmedAt: null,
      invitationSent: [],
      ownerId: props.ownerId,
    });
  }

  update(props: {
    organizationName: string;
    status: string;
    corporationName: string;
    street: string;
    city: string;
    zipCode: string;
    country: string;
    companyRegistrationNumber: string;
    vatNumber: string;
    emoji?: string;
  }) {
    this.props.organizationName = props.organizationName;
    this.props.status = props.status;
    this.props.corporationName = props.corporationName;
    this.props.street = props.street;
    this.props.city = props.city;
    this.props.zipCode = props.zipCode;
    this.props.companyRegistrationNumber = props.companyRegistrationNumber;
    this.props.country = props.country;
    this.props.vatNumber = props.vatNumber;
    this.props.emoji = props.emoji;
  }
}
