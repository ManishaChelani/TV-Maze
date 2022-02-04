import {mount, shallowMount} from '@vue/test-utils'
import Header from '../../src/components/Header.vue'
import { PROPERTIES }  from '../../src/assets/resources/properties'
import service from '../../src/service/service.ts'
import modelFunction from '../../src/genericMethods/modelFunction.ts'
let model= modelFunction.getInstance()
let serviceinstance=  service.getInstance()
let mockStorage = {}
beforeAll(() => {
  global.Storage.prototype.setItem = jest.fn((key, value) => {
    mockStorage[key] = value
  })
  global.Storage.prototype.getItem = jest.fn((key) => mockStorage[key])
})
global.Storage.prototype.clear=jest.fn()

beforeEach(() => {
  mockStorage = {}
})

afterAll(() => {
	global.Storage.prototype.setItem.mockReset()
  global.Storage.prototype.getItem.mockReset()
  global.Storage.prototype.clear.mockReset()
  serviceinstance.fetchData.mockReset()
})

//const wrapper=shallowMount(Header)

describe('testing method created',()=>{
  model.getItemFromLocalStorage=jest.fn().mockImplementation(()=> "{\"Top Rated\":[{\"test\":\"test\"}],\"Fiction\":[{\"test\":\"test\"}],\"Action\":[{\"test\":\"test\"}]}")
  test('calling created', async ()=>{
    const wrapper=shallowMount(Header)
  
    expect(wrapper.vm.allShows).toEqual({"Top Rated":[{"test":"test"}],"Fiction":[{"test":"test"}],"Action":[{"test":"test"}]})
    expect(wrapper.vm.allGener).toEqual(["Action","Fiction"])

  })
describe('Header.vue',()=>{
  const wrapper=shallowMount(Header)
    test('Header Page Loaded', () =>{
        expect(wrapper.text()).toContain('TV MAZE')
    })
})
 describe('testing method getGenerList',()=>{
  const wrapper=shallowMount(Header)
     test('calling getGenerList', async ()=>{
        wrapper.setData({allShows:{"Action":[{"test":"test"}]}})
    await wrapper.vm.getGenerList("Action")
    expect(global.Storage.prototype.setItem).toBeCalled()
    expect(mockStorage['visible']).toEqual("{\"Action\":[{\"test\":\"test\"}]}")
    expect(wrapper.emitted().dataChange).toBeTruthy()
     })
    
 })

 describe('testing method searchshows',()=>{
  const wrapper=shallowMount(Header)
    serviceinstance.fetchData=jest.fn().mockImplementation(() => Promise.resolve({ data: [] }))
    test('calling SearchSows', async ()=>{
        wrapper.setData({searchString:"test"})
   await wrapper.vm.searchShows()
            expect(serviceinstance.fetchData).toHaveBeenCalled()
            expect(serviceinstance.fetchData.mock.calls[0][0]).toBe(PROPERTIES.URL.searchShow+"?q=test")
            expect(wrapper.vm.searchString).toEqual("")
            expect(wrapper.emitted().dataChange).toBeTruthy()
    
    })
   
})

describe('testing method navigate to home',()=>{
  const wrapper=shallowMount(Header)
    test('calling navigate to home', async ()=>{
       wrapper.setData({allShows:{"Top Rated":[{"test":"test"}]}})
   await wrapper.vm.navigateToHome()
   expect(global.Storage.prototype.setItem).toBeCalled()
   expect(mockStorage['visible']).toEqual("{\"Top Rated\":[{\"test\":\"test\"}]}")
   expect(wrapper.emitted().dataChange).toBeTruthy()
    })
   
})


 
})

/*
describe('testing method clear',()=>{
    test('calling clear', async ()=>{
        const wrapper=shallowMount(Header)
   await wrapper.vm.clear()
   expect(global.Storage.prototype.clear).toBeCalled()
   
    })
   
})*/