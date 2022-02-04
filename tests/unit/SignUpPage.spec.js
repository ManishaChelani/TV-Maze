import {mount} from '@vue/test-utils'
import SignUpPage from '../../src/components/SignUpPage.vue'

describe('LandingPage.vue',()=>{
  //  const createUser=jest.fn();
 
    const mockRouter = {
        push: jest.fn()
      }
    
    const wrapper=mount(SignUpPage,{
        props:{
            message:"",
            showSignUp:true
        },
        global: {
            mocks: {
              $router: mockRouter
            }}
    })
  
    test('SignUp Page Loaded', () =>{
        expect(wrapper.text()).toContain('Log In')

    })
    test('Login Link is available', () =>{
        expect(wrapper.html()).toContain("/login")

    })
    test('call crate user',async()=>{
      console.log = jest.fn();
      await wrapper.vm.createUser()
      expect(console.log.mock.calls[0][0]).toBe('User Created');
    })
   
})
