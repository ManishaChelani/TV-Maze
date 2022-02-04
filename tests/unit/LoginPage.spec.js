import {shallowMount} from '@vue/test-utils'
import LoginPage from '../../src/components/LoginPage.vue'
import { PROPERTIES }  from '../../src/assets/resources/properties'
import service from '../../src/service/service.ts'
import modelFunction from '../../src/genericMethods/modelFunction.ts'
let model=new modelFunction()
let serviceinstance=  service.getInstance()
let mockStorage = {}
beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value
  })
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key])
})

beforeEach(() => {
  mockStorage = {}
})

afterAll(() => {
	global.Storage.prototype.setItem.mockReset()
  global.Storage.prototype.getItem.mockReset()
  serviceinstance.fetchData.mockReset()
})

describe('LoginPage.vue',()=>{
    const wrapper=shallowMount(LoginPage)
    test('LoginPage Page Loaded', () =>{
        expect(wrapper.text()).toContain('Sign Up')
    })
})

describe('validateUser',()=>{
    const wrapper=shallowMount(LoginPage)
    it('validate user has been called with wrong username',async ()=>{
   await wrapper.setData({Username:'System1',Password:"System"}) 
      await   wrapper.vm.validateUser()
        expect(wrapper.text()).toContain('Please enter correct Username and Password')
    })   
})



describe('validate User When promise is rejected',()=>{

    serviceinstance.fetchData=jest.fn().mockImplementation(() => Promise.reject({ data: [] }))
     serviceinstance.postError=jest.fn()
    const wrapper=shallowMount(LoginPage)
    test('validate user when promise is rejected',async ()=>{
        await wrapper.setData({Username:'System',Password:"System"}) 
           await   wrapper.vm.validateUser()
            expect(serviceinstance.postError).toHaveBeenCalled()
         })
})
describe('validate User with correct username',()=>{

    serviceinstance.fetchData=jest.fn().mockImplementation(() => Promise.resolve({ data: [] }))
    const wrapper=shallowMount(LoginPage)
    test('validate user has been called with correct username',async ()=>{
        await wrapper.setData({Username:'System',Password:"System"}) 
           await   wrapper.vm.validateUser()
           expect(global.Storage.prototype.setItem).toBeCalled()
           expect(mockStorage[PROPERTIES.LOCALSTORAGEKEYS.TOKEN]).toEqual(PROPERTIES.CONSTANT.TRUE)
            expect(serviceinstance.fetchData).toHaveBeenCalled()
            expect(serviceinstance.fetchData.mock.calls[0][0]).toBe(PROPERTIES.URL.searchUrl)
         })
         
})