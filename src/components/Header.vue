<template>
     <nav class="navbar navbar-expand-lg fixed-top navbar-light bg-light">
  <div class="container-fluid">
    <span class="navbar-brand">TV MAZE</span>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
     <ul class="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll" style="--bs-scroll-height: 500px;">
        <li class="nav-item" @click="this.navigateToHome()">
          <a class="nav-link" aria-current="page" >Home</a>
        </li>
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Genre
          </a>
         
		   <ul class="dropdown-menu hideScroller2" aria-labelledby="navbarDropdown">
             <li v-for="(geners,index) in this.allGener" v-bind:key="index" @click="this.getGenerList(geners)">
					 <a class="dropdown-item">{{geners}}</a></li>
           </ul>
         </li>
        <li class="nav-item" @click="this.clear()">
          <a class="nav-link" aria-current="page" >Logout</a>
        </li>
      </ul>
      
      <div class="d-flex">
        <input v-model="searchString" class="form-control me-2" type="text" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success"  @click="searchShows()">Search</button>
      </div>
    </div>
  </div>
</nav>
</template>


<script>
/* eslint-disable */
import service from '../service/service.ts'
import modelFunction from '../genericMethods/modelFunction.ts'
import { PROPERTIES } from '../assets/resources/properties.ts'

let model= modelFunction.getInstance();
let serviceinstance=  service.getInstance()

export default {
  name: 'Header',
   data(){
        return{
      allShows: {},
			showGeners:[],
      searchString:"",
      allGener:[]
   
        }
    },
    methods:{
      //to Get all show of the genere
      getGenerList(gener){
        try{
		   let listofShows={}
        listofShows[gener]=this.allShows[gener]
        model.setItemInLocalStorage((JSON.stringify(listofShows)),PROPERTIES.LOCALSTORAGEKEYS.VISIBLE)
     
		   this.$emit('dataChange')
        document.getElementsByClassName("navbar-toggler")[0].click()
        }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
               //  console.error("There was an error!", error);
            }
      },
      //search for shows
        async  searchShows(){
          try{
          const promise= serviceinstance.fetchData(PROPERTIES.URL.searchShow+"?q="+this.searchString).then((response)=> { return response.data;
            }).then((data)=> {return data})
              .catch(error => {
              serviceinstance.postError(error)
             //    console.error("There was an error!", error);
          });
        const data=await promise;
       
        this.searchString="";
      
        model.getAllShows(data,PROPERTIES.CONSTANT.TOPRESULT);
       
        this.$emit('dataChange')
         document.getElementsByClassName("navbar-toggler")[0].click()
          }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
              //   console.error("There was an error!", error);
            }
      },
      clear(){
        
        localStorage.clear()
        this.$router.push('/')
      },
      navigateToHome(){
        try{
        let tempObj={};
        tempObj[PROPERTIES.CONSTANT.TOPRATED]=this.allShows[PROPERTIES.CONSTANT.TOPRATED]
        model.setItemInLocalStorage(JSON.stringify(tempObj),PROPERTIES.LOCALSTORAGEKEYS.VISIBLE)
      
      //  document.getElementById("checkbox_toggle").checked=false
        this.$emit('dataChange')
          document.getElementsByClassName("navbar-toggler")[0].click()
        }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
              //   console.error("There was an error!", error);
            }
      }
    },
    created(){
		try{
     
      this.allShows=JSON.parse(model.getItemFromLocalStorage(PROPERTIES.LOCALSTORAGEKEYS.SHOWDETAILS));
        for(let key in this.allShows){
            if(key!=PROPERTIES.CONSTANT.TOPRATED)
            this.allGener.push(key)
        }
        this.allGener.sort();
    }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
               //  console.error("There was an error!", error);
            }
    }
}
</script>
<style>

</style>