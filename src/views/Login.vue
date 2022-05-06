<template>
    <div class="cont">
  
    
        <div>
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input v-model="username" type="username" >
        </div>
        <div>
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" >
        </div>
        
        <button type="submit" class="btn btn-primary mt-3" @click="login()">Submit</button>
   
   
    </div>

</template>
<script>
import {respond} from '../utils/handleResponses.js'
export default {
    data(){
        return{
            username:"",
            password:""

        }
    },
    methods:{
        login: function(e){
           
            this.$store.dispatch('login',{username:this.username,password:this.password})
            .then((resp)=>{
               let result = respond(resp.data.login)
              
               if(result.type==="error"){
                   console.log(result.text)
               }else{
                   this.$router.push("/visits")
               }
                
                })
            .catch(err => console.log(err))
        }
    }
    
}
</script>
<style scoped>
.cont{
  display:flex;
  justify-content: center;
  background-color: aqua;
  padding: 3px;

}

</style>