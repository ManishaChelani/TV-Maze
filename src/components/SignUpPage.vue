<template>
     <div class="wrapper fadeInDown">
  <div id="formContent">
   
    <div class="fadeIn first">
      <img src="../assets/logo.png" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <div id="form">
		<input v-model="Email" type="text" id="Email" class="fadeIn second" name="Email" placeholder="Email">
      <input v-model="Username" type="text" id="login" class="fadeIn second" name="Username" placeholder="login">
      <input v-model="Password" type="password" id="password" class="fadeIn third" name="Password" placeholder="password">
	  <div v-if="this.error"><p>Please enter correct Username and Password</p></div>
      <input type="submit"  class="fadeIn fourth" value="Sign Up"  @click="createUser()">
    </div>

   
    <div id="formFooter">
      <a class="underlineHover" href="/login">Log In</a>
    </div>

  </div>
</div>
</template>

<script>


export default {
  name: 'SignUpPage',
    data(){
        return{
            Email:"",
            Username:"",
            Password:""

        }
    },
        methods:{
            createUser(){
                //Create user here
                console.log("User Created")
                this.$router.push("/login");
            }
        }
  
}
</script>

<style>

</style>
