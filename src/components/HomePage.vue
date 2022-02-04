<template>
  <Header @dataChange="dataChange()"/>
   <ShowDetails :displayChange="displayChange"/> 
</template>

<script>
import Header from '../components/Header.vue'

import ShowDetails from '../components/ShowDetails.vue'


export default {
  name: 'HomePage',
  data() {
    return{
      displayChange:0
    }
  },
   components:{
     Header,ShowDetails
   },
   methods:{
     dataChange(){
       this.displayChange=!this.displayChange
     }
   }
  
}
</script>

<style>

</style>
