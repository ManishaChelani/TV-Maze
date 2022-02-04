import axios from "axios";
import { PROPERTIES }  from '../../src/assets/resources/properties'
import service from '../../src/service/service.ts'

let serviceinstance=  service.getInstance();
jest.mock("axios");

describe('fetchData',  () => {
    it("should call get search URL", async () => {
       const result = await serviceinstance.fetchData(PROPERTIES.URL.searchUrl);
        expect(axios.get).toHaveBeenCalledWith(PROPERTIES.URL.searchUrl);
    

});
});
describe('postError',  () => {
    console.log = jest.fn();
    it("should log error", async () => {
     serviceinstance.postError("TestErrorString");
       expect(console.log.mock.calls[0][0]).toBe('TestErrorString');
    

});
});