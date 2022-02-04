
<template>
    
  <div v-for="(genresObj,gener,index) in this.showDetails" v-bind:key="index" class="viewDetails">
    <div class="container">
     <div class="row">
      
      <div id="description" class="col">  
      <h3  v-if="this.ButtonText=='All Season'"> {{gener}} Shows</h3>
      <h3 v-if="this.ButtonText=='All Episode'"> {{this.SeasonName}} Seasons</h3>
      <h3 v-if="this.ButtonText=='All Details'"> {{this.SeasonName}} Season {{this.episodeNumber}}</h3>
      </div>
      <div id="back" class="col"> 
          <button class="btn btn-outline-success" v-if="ButtonText=='All Episode'" @click="goBackToAllShows()">Go Back</button>
       <button class="btn btn-outline-success" v-if="ButtonText=='All Details'" @click="getAllSeason(lastSeasonId,this.lastShowkey,this.SeasonName)">Go Back</button>
      </div>
     </div>
     </div>
	<div >
			<div class="container">
					<div class="row g-3">
					<div class="col-12 col-md-6 col-lg-4" v-for="details in genresObj.splice(0,totalShowsVisible)" v-bind:key="details.id">
            
						<div class="card border border-dark" style="width: 18rem;heigth:18rem;margin: 0 auto">
							<img  v-bind:src="details.image" alt="Image Not Available" class="card-img-top" >
							<div class="card-body">
								<h5 class="card-title">{{details.name}}</h5>
								<div class="text"><p class="card-text text-start hideScroller">
									
										<span>Rating  : {{details.rating}}</span><br>
										<span>Runtime : {{details.averageRuntime}}</span><br>
                    
										<span v-if="this.ButtonText!='All Season'">Summary :</span><br>
										<span v-if="this.ButtonText!='All Season'" id="summary" class='summaryDetails' v-bind:innerHTML="details.summary"></span><br>
									
								</p></div>	
								<a class="btn btn-outline-success" v-if="ButtonText=='All Season'" @click="getAllSeason(details.id,gener,details.name)">{{ButtonText}}</a>
								<a class="btn btn-outline-success" v-if="ButtonText=='All Episode'" @click="getAllEpisode(details.id,details.seasonNo)">{{ButtonText}}</a>
								<a class="btn btn-outline-success" v-if="ButtonText=='All Details'" @click="play()">Play</a>
							</div>
						</div>
					</div>
				</div>
			</div>
 
		</div>
       
      
  </div>
</template>


<script>
/* eslint-disable */
import service from '../service/service.ts'
import modelFunction from '../genericMethods/modelFunction.ts'
import "bootstrap/dist/css/bootstrap.min.css"
import { PROPERTIES } from '../assets/resources/properties.ts'

let model=modelFunction.getInstance();
let serviceinstance=  service.getInstance();
  export default {
    name:'ShowDetails',
    props:["displayChange"],
    data() {
    
      return {
          showDetails:{
             
          },
          allShows:{},
         totalShowsVisible:40,
         ButtonText:"All Season",
         lastSeasonId:"",
         lastShowkey:"",
         SeasonName:"",
         episodeNumber:"",
         hasData:0
      }
    },
     watch: {
    displayChange: function () {
      
     this.ButtonText="All Season"
     this.dataChange()
    }},
    methods:{  
      dataChange(){
        try{
         this.showDetails=JSON.parse(model.getItemFromLocalStorage(PROPERTIES.LOCALSTORAGEKEYS.VISIBLE))
      
        }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
               //  console.error("There was an error!", error);
            }
      },
      play(){
        //code to play the video
        //window.open(url);
      },
      goBackToAllShows(){
   
         let lastList={}
        try{
          if(this.lastShowkey=='Top Results'){
         
            model.setItemInLocalStorage(model.getItemFromLocalStorage(PROPERTIES.LOCALSTORAGEKEYS.LASTSEARCHRESULT),PROPERTIES.LOCALSTORAGEKEYS.VISIBLE)
          }
          else{
            this.allShows=JSON.parse(model.getItemFromLocalStorage(PROPERTIES.LOCALSTORAGEKEYS.SHOWDETAILS));
            lastList[this.lastShowkey]=this.allShows[this.lastShowkey]
            model.setItemInLocalStorage((JSON.stringify(lastList)),PROPERTIES.LOCALSTORAGEKEYS.VISIBLE)
          }  
        this.dataChange()
        this.ButtonText="All Season"
        }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
                // console.error("There was an error!", error);
            }
      },
      async  getAllSeason(showID,gener,name){
        this.lastShowkey=gener;
        this.SeasonName=name;
       try{
          const promise= serviceinstance.fetchData(PROPERTIES.URL.searchUrl+"/"+showID+"/seasons").then((response)=> { return response.data;
            }).then((data)=> {return data})
              .catch(error => {
               serviceinstance.postError(error)
              //   console.error("There was an error!", error);
          });
        const data=await promise;
  
        model.getAllShows(data,PROPERTIES.CONSTANT.SEASONS);
        this.dataChange();
        this.ButtonText="All Episode"
        this.lastSeasonId=showID;
       }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
              //   console.error("There was an error!", error);
            }
      },
      async  getAllEpisode(seasonID,seasonNo){
        try{
        this.episodeNumber=seasonNo;
          
          const promise= serviceinstance.fetchData(PROPERTIES.URL.seasonurl+seasonID+"/episodes").then((response)=> { return response.data;
            }).then((data)=> {return data})
              .catch(error => {
           //   console.error("There was an error!", error);
            serviceinstance.postError(error)
          });
        const data=await promise;
        this.ButtonText="All Details"
        model.getAllShows(data,PROPERTIES.CONSTANT.EPISODE);
        this.dataChange();
        }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
                 //console.error("There was an error!", error);
            }
      }
  
  },

  created(){
    try{
   this.showDetails=JSON.parse(model.getItemFromLocalStorage(PROPERTIES.LOCALSTORAGEKEYS.VISIBLE))
  }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
                 //console.error("There was an error!", error);
            }
  }
}
</script>
