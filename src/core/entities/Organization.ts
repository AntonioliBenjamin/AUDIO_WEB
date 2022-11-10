import { oraganizationDb } from './../../adapters/repositories/InMemoryOrganisationRepository';
export type OrganizationProperties = {
    id: string;
    organizationName: string,
    status: string,
    corporationName: string,
    street: string,
    city: string,
    zipCode: string,
    country: string,
    companyRegistrationNumber: string,
    vatNumber: string,
    emoji?: string,
    createdAt: Date,
    confirmedAt: Date,
    ownerId: string,
}

export class Organization {
    props: OrganizationProperties;

    constructor(props: OrganizationProperties) {
        this.props = props;
    }

    static create(props: {
        id: string;
        organizationName: string,
        status: string,
        corporationName: string,
        street: string,
        city: string,
        zipCode: string,
        country: string,
        companyRegistrationNumber: string,
        vatNumber: string,
        emoji?: string,
        createdAt: Date,
        confirmedAt: Date,
        ownerId: string,
    }) {
        return new Organization({
            id: props.id,
            organizationName: props.organizationName,
            status: props.status,
            corporationName: props.corporationName,
            street: props.street,
            city: props.city,
            zipCode: props.zipCode,
            country: props.country,
            companyRegistrationNumber: props.companyRegistrationNumber,
            vatNumber: props.vatNumber,
            emoji: props.emoji,
            createdAt: props.createdAt,
            confirmedAt: props.confirmedAt,
            ownerId: props.ownerId,
        })
    }

    update(props: {
        organizationName: string,
        status: string,
        corporationName: string,
        street: string,
        city: string,
        zipCode: string,
        country: string,
        companyRegistrationNumber: string,
        vatNumber: string,
        emoji?: string,
    }) {
        return new Organization({
            id: this.props.id,
            organizationName: props.organizationName,
            status: props.status,
            corporationName: props.corporationName,
            street: props.street,
            city: props.city,
            zipCode: props.zipCode,
            country: props.country,
            companyRegistrationNumber: props.companyRegistrationNumber,
            vatNumber: props.vatNumber,
            emoji: props.emoji,
            createdAt: this.props.createdAt,
            confirmedAt: this.props.confirmedAt,
            ownerId: this.props.ownerId
        })
    }
}