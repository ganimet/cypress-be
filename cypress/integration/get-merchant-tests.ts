import MerchantService from "../services/merchant.service";
import {CreateMerchantMock} from "../mocks/create-merchant.mock";
import {CreateMerchantRequest} from "../models/Merchant";

describe('get-endpoint-tests', () => {
    let createMerchantMock: CreateMerchantRequest;
    let merchantService: MerchantService;
    let idList: string[];

    before(() => {
        Cypress.config('defaultCommandTimeout', 5000);
        idList = [];
        createMerchantMock = CreateMerchantMock();
        merchantService = new MerchantService(cy);
    });

    it('should get by id response 200 ok',
        {
            defaultCommandTimeout: 5000
        }, () => {
             merchantService.getMerchantById("071ab1b5-dab7-461b-b2cf-6308a484e6cc").then(response=>{
                 cy.wrap(response).its('status').should('eq', 200)
                 cy.wrap(response).its('body').its("name").should("equal", "GTest");
             })
        },);

    it.skip('should create a new merchant and get by id response 200 ok',
        () => {
            merchantService.createEndpoint(createMerchantMock).then(createMerchantResponse=>{
                expect(createMerchantResponse.status).to.equal(201);
                idList.push(createMerchantResponse.body._id);
                const response = merchantService.getMerchantById(createMerchantResponse.body._id);
                response.its("status").should("equal", 200);
            })
        });

    it.skip('endpoint get should response 409 conflict',
        () => {
            createMerchantMock = CreateMerchantMock({
                name: 'BGTest',
            });
            createMerchantMock.addressRequestModel.cityCode = "34000"

            const response = merchantService.createEndpoint(createMerchantMock);
            response.its("status").should("equal", 409);
        });

    it('endpoint get should response 404 not found ',
        () => {
            const response = merchantService.getMerchantById("332324");
            response.its("status").should("equal", 404)
        });

    //after all delete all created merchants for this test
    after(() => {
        merchantService.deleteMerchantByIdList(idList)
    })
});
