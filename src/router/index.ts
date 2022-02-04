
import {createRouter,createWebHistory} from 'vue-router';

import LandingPage from '../components/LandingPage.vue'
import HomePage from '../components/HomePage.vue'
import LoginPage from '../components/LoginPage.vue'
import SignUpPage from '../components/SignUpPage.vue'
import { PROPERTIES }  from '../assets/resources/properties'


const routes=[
    
        { path: '/',name:'LandingPage', component: LandingPage },
        { path: '/home',name:'HomePage', component: HomePage },
        { path: '/login',name:'LoginPage', component: LoginPage },
        { path: '/signUp',name:'SignUpPage', component: SignUpPage }
      //  {path:'/searchResult',name:'SSearchResultPage',component:SearchResult},
        
    
]

 const router =createRouter({
  history:createWebHistory(process.env.BASE_URL),routes,
        
})
  router.beforeEach((to, from) => {
  
        if(to.path===PROPERTIES.PATH.HOME){
        if(localStorage.getItem(PROPERTIES.LOCALSTORAGEKEYS.TOKEN)!=PROPERTIES.CONSTANT.TRUE){
            router.push(PROPERTIES.PATH.LOGIN)
        }}
        if(from.path===PROPERTIES.PATH.HOME || to.path===PROPERTIES.PATH.ROOT  ){
                localStorage.clear()
        }
  })
export default router