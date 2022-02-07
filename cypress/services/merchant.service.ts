import {GenericResponse} from "../models/GenericResponse";
import {
    CreateMerchantRequest,
    CreateMerchantResponse,
    GetMerchantResponse,
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

    getMerchantById(id: string): Cypress.Chainable<GenericResponse<GetMerchantResponse>> {
        const URL = MerchantService.createUrl(`/merchants/id/${id}`);
        return this.tokenService.getToken()
            .then((token)=> cy.request({
                method: 'GET',
                url: URL,
                headers: {
                    Authorization: `Token ${token}`,
                },
                failOnStatusCode: false
            }))
            .then((res)=>({
                status: res.status,
                body: res.body
            }))

    }

    deleteMerchantById(id: GetMerchantResponse['_id']): Cypress.Chainable<GenericResponse<any>> {
        const URL = MerchantService.createUrl(`/merchants/id/${id}`);
        return this.tokenService.getToken()
            .then((token) => {
                return cy.request({
                    method: 'DELETE',
                    url: URL,
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    failOnStatusCode: false
                })
                    .then((res) => {
                        return {
                            status: res.status,
                            body: res.body
                        }
                    })
            })
    }

    createEndpoint(body: CreateMerchantRequest): Cypress.Chainable<GenericResponse<CreateMerchantResponse>> {
        const URL = MerchantService.createUrl('/merchants');
        return this.tokenService.getToken()
            .then((token) => {
                return cy.request({
                    method: 'POST',
                    url: URL,
                    body,
                    headers: {
                        Authorization: `Token ${token}`,
                    },
                    failOnStatusCode: false
                })
                    .then((res) => {
                        return {
                            status: res.status,
                            body: res.body
                        }
                    })
            })
    }

    deleteMerchantByIdList(idList: GetMerchantResponse['_id'][]): Cypress.Chainable<GenericResponse<any>>[] {
        return idList.map(id => this.deleteMerchantById(encodeURI(id)));
    }
}

export default MerchantService;
