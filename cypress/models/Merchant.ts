
export interface CreateMerchantRequest{
	name: string;
	legalName:string;
	merchantType:Type
	//...
}

export interface CreateMerchantResponse{
	_id: string;
	//...
}

export interface GetMerchantResponse{
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	//...
}

export interface Merchant{
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	isManaged: boolean;
	version: number;
	//..
}

export interface MerchantStatus{
	status:string;
	statusReason:string;
	subReason:string;
}

export enum Type {
	regular  = 'Regular',
	mega    = 'Mega',
	supplier = 'Supplier'
}

//..

