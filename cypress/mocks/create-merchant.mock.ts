import {Address, AddressRequestModel, CreateMerchantRequest, SalesCategory,} from "../models/Merchant";
import faker from 'faker';

const defaults = (): CreateMerchantRequest => {
	return {
		"addressRequestModel": defaultAddress(),
		"email": faker.internet.email(),
		"financialIdentityNumber": getRandomTCKN(),
		"firstName": faker.random.word(),
		"lastName": faker.random.word(),
		"mobilePhoneNumber": 0,
		"salesCategory": defaultSalesCategory(),
		"taxOfficeId": faker.datatype.uuid(),
		"urlPostfix": faker.random.word(),
		"username":  faker.internet.email(),
		"name": faker.datatype.uuid(),
		"legalName": faker.random.word(),
		"password":faker.internet.password(12, false, '', '*'),
		// "password":faker.internet.password(8,false,new RegExp("^(?=.[0-9])(?=.[A-Z])(?=.[a-z])(?=.[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,16}$"),"g"),
		//password(len?: number, memorable?: boolean, pattern?: string | RegExp, prefix?: string): string;

	};
}
const defaultAddress= (): AddressRequestModel => {
	return {
		cityCode: "34",
		townCode:"2032"
	};
}
const defaultSalesCategory= (): SalesCategory => {
	return {
		name: "Akıllı Ev & Yaşam",
		value:80107000
	};
}
const getRandomTCKN= ()=> {
	let tcno = "" + Math.floor(900000001 * Math.random() + 1e8),
		list = tcno.split("").map(function (t) {
			return parseInt(t, 10);
		}),
		tek = list[0] + list[2] + list[4] + list[6] + list[8],
		cift = list[1] + list[3] + list[5] + list[7],
		tc10 = (7 * tek - cift) % 10;
	return (tcno + ("" + tc10) + ("" + ((cift + tek + tc10) % 10))).toString();
}

export function CreateMerchantMock(merchant: Partial<CreateMerchantRequest>={}) {
 return {
	 ...defaults(),
	 ...merchant
 }
}
