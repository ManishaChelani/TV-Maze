import { shallowMount} from '@vue/test-utils'

import ShowDetails from '../../src/components/ShowDetails.vue'
import { PROPERTIES }  from '../../src/assets/resources/properties'
import service from '../../src/service/service.ts'
import modelFunction from '../../src/genericMethods/modelFunction.ts'

let serviceinstance=  service.getInstance()
let mockStorage = {}
let model=modelFunction.getInstance()
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
  model.getItemFromLocalStorage.mockReset()
})
const wrapper=shallowMount(ShowDetails)
wrapper.setData({showDetails:{"Top Rated":[{"name":"Stargate SG-1","image":"https://static.tvmaze.com/uploads/images/medium_portrait/1/3027.jpg","id":204,"rating":9.3,"summary":"<p><b>Stargate SG-1</b> is a science fiction series based on the original film <i>Stargate</i>. It involves the team SG-1 going on various adventures to different alien worlds through Stargates. Throughout the series they encounter various alien threats and allies including but not limited to the Goa'uld and the Asgard.</p>","averageRuntime":60,"seasonNo":""}]}})

describe('ShowDetails.vue',()=>{
    test('ShowDetails Page Loaded',async() =>{
        expect(wrapper.text()).toContain('Top Rated')
    })
})

describe('testing method goBackToAllShows when last show is top results',()=>{
    wrapper.setData({lastShowkey:"Top Results"})
    model.getItemFromLocalStorage=jest.fn().mockImplementation(()=> "{\"Top Rated\":[{\"test\":\"test\"}],\"Action\":[{\"test\":\"test\"}]}")
    test('calling goBackToAllShows', async ()=>{
   await wrapper.vm.goBackToAllShows()

   expect(mockStorage['visible']).toEqual("{\"Top Rated\":[{\"test\":\"test\"}],\"Action\":[{\"test\":\"test\"}]}")
  
    })
   
})
describe('testing method goBackToAllShows when last show is Action',()=>{
    const wrapper=shallowMount(ShowDetails)
    wrapper.setData({lastShowkey:"Action"})
    model.getItemFromLocalStorage=jest.fn().mockImplementation(()=> "{\"Top Rated\":[{\"test\":\"test\"}],\"Action\":[{\"test\":\"test\"}]}")
    test('calling goBackToAllShows', async ()=>{
   await wrapper.vm.goBackToAllShows()
   expect(model.getItemFromLocalStorage).toHaveBeenCalled()
  
   expect(wrapper.vm.allShows).toEqual({"Top Rated":[{"test":"test"}],"Action":[{"test":"test"}]})
   expect(mockStorage['visible']).toEqual("{\"Action\":[{\"test\":\"test\"}]}")
  
    })
   
})

 describe('testing method getAllSeason',()=>{
   
    serviceinstance.fetchData=jest.fn().mockImplementation(() => Promise.resolve({ data: [] }))
    test('calling getAllSeason', async ()=>{
      
   await wrapper.vm.getAllSeason(1,"Action","Test")
            expect(serviceinstance.fetchData).toHaveBeenCalled()
            expect(serviceinstance.fetchData.mock.calls[0][0]).toBe(PROPERTIES.URL.searchUrl+"/1/seasons")
            expect(wrapper.vm.ButtonText).toEqual("All Episode")
            expect(wrapper.vm.lastSeasonId).toEqual(1)
           
           // expect(wrapper.vm.dataChange).toHaveBeenCalled()
    
    })
   
})

describe('testing method getAllEpisode',()=>{
    
    serviceinstance.fetchData=jest.fn().mockImplementation(() => Promise.resolve({ data: [] }))
    test('calling getAllEpisode', async ()=>{
      
   await wrapper.vm.getAllEpisode(1,450)
            expect(serviceinstance.fetchData).toHaveBeenCalled()
            expect(serviceinstance.fetchData.mock.calls[1][0]).toBe(PROPERTIES.URL.seasonurl+"1/episodes")
            expect(wrapper.vm.ButtonText).toEqual("All Details")
           
         
    
    })
   
})

