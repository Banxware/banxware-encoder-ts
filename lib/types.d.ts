export interface Owner {
    title: string;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    nationality: string;
    taxNumber: string;
    sharesPercent: number;
    ultimateBeneficial: boolean;
    legalRepresentative: boolean;
    applicantOwner: boolean;
    address: Address;
}
export interface Address {
    addressLine1: string;
    addressLine2?: string;
    streetNumber: string;
    zipCode: string;
    city: string;
    state: string;
    country: string;
}
export interface Revenue {
    month: number;
    revenueInCents: number;
    currency: string;
}
export interface MerchantLinkData {
    merchantId: string;
    mcc: string;
    name: string;
    email: string;
    address: Address;
    owners: Owner[];
    timeOfRunBusinessInMonths: number;
    lastSixMonthsRevenue: Revenue[];
    legalForm?: string;
    phoneNumber?: string;
    responsiblePublicAuthority?: string;
    foundationDate?: string;
    registrationNumber?: string;
    register?: string;
    crefoId?: string;
    website?: string;
    numberOfEmployees?: number;
    taxNumber?: string;
    subjectToVat?: boolean;
    vatId?: string;
}
