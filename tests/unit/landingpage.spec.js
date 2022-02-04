import {mount} from '@vue/test-utils'
import LandingPage from '../../src/components/LandingPage.vue'

describe('LandingPage.vue',()=>{
    const wrapper=mount(LandingPage)
    test('Landing Page Loaded', () =>{
        expect(wrapper.text()).toContain('Welcome to TV Amaze')

    })
    test('it Contains login Router Link',() =>{
        expect(wrapper.html()).toContain('\"/login\"')
    })
    test('it Contains Sign Up Router Link',() =>{
        expect(wrapper.html()).toContain('\"/signup\"')
    })
})
