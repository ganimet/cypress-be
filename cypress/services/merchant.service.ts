import {GenericResponse} from "../models/GenericResponse";
import {CreateMerchantRequest, CreateMerchantResponse, GetMerchantResponse} from "../models/Merchant";

class EndpointService {
	private readonly cy: Cypress.Chainable;

	constructor(cy: Cypress.Chainable) {
		this.cy = cy;
	}

	getMerchantById(id: string): Promise<GenericResponse<GetMerchantResponse>> {
		return new Promise((resolve) => {
			cy.request({
				method: 'GET',
				url: `/merchants/id/${id}`,
				failOnStatusCode: false
			})
				.then((res) => {
					resolve({
						status: res.status,
						body: res.body
					})
				})
		})
	}

	deleteMerchantById(id: GetMerchantResponse['_id']): Promise<GenericResponse<any>> {
		return new Promise((resolve) => {
			cy.request({
				method: 'DELETE',
				url: `merchants/id/${id}`,
				failOnStatusCode: false
			})
				.then((res) => {
					resolve({
						status: res.status,
						body: res.body
					})
				})
		})
	}

	createEndpoint(body: CreateMerchantRequest): Promise<GenericResponse<CreateMerchantResponse>> {
		return new Promise((resolve) => {
			cy.request({
				method: 'POST',
				url: `merchants`,
				body,
				failOnStatusCode: false
			})
				.then((res) => {
					resolve({
						status: res.status,
						body: res.body
					})
				})
		})
	}

	deleteMerchantByIdList(idList: GetMerchantResponse['_id'][]): Promise<GenericResponse<any>[]> {
		return Promise.all(idList.map(id=>this.deleteMerchantById(encodeURI(id))));
	}
}

export default EndpointService;
