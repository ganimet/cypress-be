import MerchantService from "../services/merchant.service";
import {CreateMerchantMock} from "../mocks/create-merchant.mock";
import {CreateMerchantRequest, GetMerchantResponse,CreateMerchantResponse} from "../models/Merchant";

describe('get-endpoint-tests', () => {
    let createMerchantMock: CreateMerchantRequest;
    let createMerchantResponse : CreateMerchantResponse;
    let merchantService: MerchantService;
    let idList:  string[];

    before(() => {
        idList = [];
        createMerchantMock = CreateMerchantMock();
        merchantService = new MerchantService(cy);
    });

    it('endpoint get should response 200 ok',
        async () => {
            await merchantService.createEndpoint(createMerchantMock);
            idList.push(createMerchantResponse._id);
            const res = await merchantService.getMerchantById(createMerchantResponse._id);
            expect(res.status).to.equal(200);
            expect(res.body.name).to.equal(createMerchantMock.name);
        });

    it('endpoint get should response 404 not found ',
        async () => {
            const res = await merchantService.getMerchantById("332324");
            expect(res.status).to.equal(404);
        });

    //after all delete all created merchants for this test
    after(async () => {
        await merchantService.deleteMerchantByIdList(idList)
    })
});
