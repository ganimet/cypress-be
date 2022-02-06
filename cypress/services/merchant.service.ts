import {GenericResponse} from "../models/GenericResponse";
import {
	CreateMerchantRequest,
	CreateMerchantResponse,
	CreateTokenBody,
	GetMerchantResponse,
	TokenResponse
} from "../models/Merchant";
import TokenService from "./token.service";


class MerchantService {
    private readonly cy: Cypress.Chainable;
    private readonly tokenService: TokenService;

    constructor(cy: Cypress.Chainable) {
        this.cy = cy;
        this.tokenService = new TokenService('http://merchantservice.qa.hepsiburada.com');
	}

    private static createUrl(path: string): string {
        return `http://merchantservice.qa.hepsiburada.com${path}`
    }
	async getMerchantById(id: string): Promise<GenericResponse<GetMerchantResponse>> {
		const URL = MerchantService.createUrl(`/merchants/id/${id}`);
		const token = await this.tokenService.getToken();
		return new Cypress.Promise(async (resolve) => {
			const request = cy.request({
				method: 'GET',
				url: URL,
				headers: {
					Authorization: `Token ${token}`,
				},
				failOnStatusCode: false
			})
				.then((res) => {
					console.log('here is response',res);
					resolve({
						status: res.status,
						body: res.body
					})
				})
			console.log(request)
		})
	}

	deleteMerchantById(id: GetMerchantResponse['_id']): Promise<GenericResponse<any>> {
		const URL = MerchantService.createUrl(`/merchants/id/${id}`);
		return new Cypress.Promise((resolve) => {
			cy.request({
				method: 'DELETE',
				url: URL,
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
		const URL = MerchantService.createUrl('/merchants');
		return new Cypress.Promise((resolve) => {
			cy.request({
				method: 'POST',
				url: URL,
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

export default MerchantService;
