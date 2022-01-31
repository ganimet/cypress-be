import {CreateMerchantRequest, Type} from "../models/Merchant";
import faker from 'faker';

const defaults = (): CreateMerchantRequest => {
	return {
		"name": faker.random.word(),
		"legalName": faker.random.word(),
		"merchantType": faker.random.word(Object.getPrototypeOf(Type)) as Type
	};
}

export function CreateMerchantMock(merchant: any={}) {
 return {
	 ...defaults(),
	 ...merchant
 }
}
