import {shallowMount} from '@vue/test-utils'
import HomePage from '../../src/components/HomePage.vue'
describe('HomePage.vue',()=>{
    const wrapper=shallowMount(HomePage)
    test('HomePage Page Loaded', () =>{
        expect(wrapper.html()).toContain('displaychange')
    })
})

describe('dataChange called',()=>{
    const wrapper=shallowMount(HomePage)
    test('dataChange called', async () =>{
        await wrapper.vm.dataChange()
        expect(wrapper.vm.displayChange).toEqual(true)
    })
})
