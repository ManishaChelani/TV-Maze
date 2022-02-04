<template>
  <div class="wrapper fadeInDown">
  <div id="formContent">
   
    <div class="fadeIn first">
      <img src="../assets/logo.png" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <div id="form">
      <input v-model="Username" type="text" id="login" class="fadeIn second" name="Username" placeholder="login">
      <input v-model="Password" type="password" id="password" class="fadeIn third" name="Password" placeholder="password">
	  <div v-if="this.error"><p>Please enter correct Username and Password</p></div>
      <input type="submit" class="fadeIn fourth" value="Log In" @click="validateUser()">
    </div>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a class="underlineHover" href="/signup">Sign Up</a>
    </div>

  </div>
</div>  
</template>

<script>
import service from '../service/service.ts'
import modelFunction from '../genericMethods/modelFunction.ts'
import { PROPERTIES }  from '../assets/resources/properties'
export default {
  name: 'LoginPage',
    data(){
        return{
            Username:"",
            Password:"",
            error:""

        }
    },
    methods:{
        async validateUser(){
                 let model= modelFunction.getInstance()
                   let serviceinstance=  service.getInstance()
            //Authentication and Authorization code will go here. Need to write serve to get authroization token and save in store or in session storage
             try{
            if(this.Username=="System" && this.Password=="System"){
               
               model.setItemInLocalStorage(PROPERTIES.CONSTANT.TRUE,PROPERTIES.LOCALSTORAGEKEYS.TOKEN)
              const promise= serviceinstance.fetchData(PROPERTIES.URL.searchUrl).then((response)=> { return response.data;      
                    }).then((data)=> {return JSON.stringify(data)})
                    .catch(error => {
                         serviceinstance.postError(error)
                        // console.error("There was an error!", error);
                    });
                    const data=await promise;
                    model.getAllShows(JSON.parse(data),PROPERTIES.CONSTANT.SORTEDSHOWS);
    
                    this.$router.push(PROPERTIES.PATH.HOME);
            }else{
                this.error=true;
            }
            }catch(error){
                //Logging logic
                 serviceinstance.postError(error)
               //  console.error("There was an error!", error);
            }            
        }
    }
  
}
</script>

