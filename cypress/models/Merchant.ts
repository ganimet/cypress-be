export interface CreateMerchantRequest {
    name: string;
    urlPostfix: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    legalName: string;
    password: string;
    addressRequestModel: AddressRequestModel;
    financialIdentityNumber: string;
    mobilePhoneNumber: number;
    salesCategory: SalesCategory;
    taxOfficeId: string;
    //...
}

export interface CreateMerchantResponse {
    _id: string;
    //...
}

export interface CreateTokenBody {
    "Username": string,
    "AppKey": string,
    "Hash": string
}

export interface TokenResponse {
    "token": string
}

export interface GetMerchantResponse {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    //...
}

export interface Merchant {
    _id: string;
    createdAt: string;
    updatedAt: string;
    name: string;
    isManaged: boolean;
    version: number;
    //..
}

export interface MerchantStatus {
    status: string;
    statusReason: string;
    subReason: string;
}

export interface Address {
    cityCode: string;
    townCode: string;
    district: string;
    neighborhood: string;
    zipCode: number;
}

export interface AddressRequestModel {
    cityCode: string;
    townCode: string;
}

export interface ContractRequestModel {
    contractId: string;
    isAccepted: boolean;
}

export interface SalesCategory {
    name: string;
    value: number;
}

export enum Type {
    regular = 'Regular',
    mega = 'Mega',
    supplier = 'Supplier'
}

//..

