/* eslint-disable */
import { PROPERTIES } from '../assets/resources/properties';
import service from '../service/service'

export default class modelFunctions{ 
    private static _instance: modelFunctions;
    private constructor()
    {
        //..
    }
    public static getInstance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
  getAllShows(allShows:any,information:string){

    const showDetails:any={};
    const sortedShows:any=[];
    try{
    for(let data of allShows){
		 if(information==PROPERTIES.CONSTANT.TOPRESULT){
            data=data.show
            }
          const wrapper={name:"",image:"",id:"",rating:"",summary:"",averageRuntime:"",seasonNo:""}
          if('name' in data)
          wrapper.name=data.name;
          if('image' in data && data.image!=null)
          {
            wrapper.image=data.image.medium;
          }
         
          wrapper.id=data.id
          if('number' in data){
              wrapper.seasonNo=data.number
          }
          wrapper.summary=data.summary;
          if(information!=PROPERTIES.CONSTANT.SEASONS){
          wrapper.rating=data.rating.average;
          wrapper.averageRuntime=data.averageRuntime
          }
          sortedShows.push(wrapper);
          
          if(information==PROPERTIES.CONSTANT.SORTEDSHOWS){
          const genre=data.genres[Math.floor(Math.random()*data.genres.length)];
          if (genre in showDetails){
              showDetails[genre].push(wrapper)
          }else{
              showDetails[genre]=[];
              showDetails[genre].push(wrapper)
            
          }
          showDetails[PROPERTIES.CONSTANT.TOPRATED]=sortedShows.sort(this.getSortOrder("rating"));
        
          this.setItemInLocalStorage(JSON.stringify(showDetails),PROPERTIES.LOCALSTORAGEKEYS.SHOWDETAILS)
        }
      }
    
      this.visibleList(sortedShows,information);
    }catch(e){
        //logging logic
        service.getInstance().postError(e)
    }
}
visibleList(data:any,visibleList:string){
    
    let sortedShows={}
    
    if(visibleList==PROPERTIES.CONSTANT.SORTEDSHOWS){
    sortedShows={"Top Rated":data.sort(this.getSortOrder("rating"))}
        
    }else if(visibleList==PROPERTIES.CONSTANT.SEASONS){
        sortedShows= {"Seasons":data}
    }else if(visibleList==PROPERTIES.CONSTANT.EPISODE){
        sortedShows= {"Episode":data}
    }else{
        sortedShows= {"Top Results":data}
        this.setItemInLocalStorage(JSON.stringify(sortedShows),PROPERTIES.LOCALSTORAGEKEYS.LASTSEARCHRESULT)
    }
    this.setItemInLocalStorage(JSON.stringify(sortedShows),PROPERTIES.LOCALSTORAGEKEYS.VISIBLE)

}
setItemInLocalStorage(data:string,key:string){
 
    localStorage.setItem(key,data)
}
getItemFromLocalStorage(key:string){
 
    return localStorage.getItem(key)
}
getSortOrder(prop:any) {  
     
    return function(a:any, b:any) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }
        
} 
}