import MerchantService from "../services/merchant.service";
import {CreateMerchantMock} from "../mocks/create-merchant.mock";
import {CreateMerchantRequest, GetMerchantResponse, CreateMerchantResponse} from "../models/Merchant";

describe('get-endpoint-tests', () => {
    let createMerchantMock: CreateMerchantRequest;
    let createMerchantResponse: CreateMerchantResponse;
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
        },async () => {
            const res = await merchantService.getMerchantById("071ab1b5-dab7-461b-b2cf-6308a484e6cc");
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal("GTest");
        },);

    it.skip('should create a new merchant and get by id response 200 ok',
        async () => {
            createMerchantResponse = (await merchantService.createEndpoint(createMerchantMock)).body;
            idList.push(createMerchantResponse._id);
            const res = await merchantService.getMerchantById(createMerchantResponse._id);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(createMerchantMock.name);
        });

    it.skip('endpoint get should response 409 conflict',
        async () => {
            createMerchantMock = CreateMerchantMock({
                name: 'BGTest',
            });
            createMerchantMock.addressRequestModel.cityCode="34000"

            console.log(createMerchantMock)
            // merchantService.createEndpoint(createMerchantMock).then((res)=>{})
            createMerchantResponse = (await merchantService.createEndpoint(createMerchantMock)).body;
            idList.push(createMerchantResponse._id);
            const res = await merchantService.getMerchantById(createMerchantResponse._id);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(createMerchantMock.name);
        });

    it.skip('endpoint get should response 404 not found ',
        async () => {
            const res = await merchantService.getMerchantById("332324");
            expect(res.status).to.equal(404);
        });

    //after all delete all created merchants for this test
    after(async () => {
        await merchantService.deleteMerchantByIdList(idList)
    })
});
