<template>
<div class="container">
    
    <div class="cont">
        <span>Login Below</span>
        <div v-if="showError" class="alert alert-warning alert-dismissible fade show" role="alert">
             {{errorMessage}}
            <button type="button" @click="showError=false" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

        <div>
            <label for="exampleInputEmail1" class="form-label">Username</label>
            <input v-model="username" type="username" >
        </div>
        <div>
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input v-model="password" type="password" >
        </div>
        
        <button type="submit" class="btn btn-primary mt-3" @click="login()" :disabled="isLoading">
            Login
            <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
        </button>
   
   
    </div>
</div>

</template>
<script>
import {mapState} from 'vuex'
import {respond} from '../utils/handleResponses.js'
export default {
    data(){
        return{
            username:"",
            password:"",
            showError:false,
            errorMessage:""

        }
    },
    computed:{
        ...mapState(['isLoading'])
    },
    methods:{
        login: function(e){
           
            this.$store.dispatch('login',{username:this.username,password:this.password})
            .then((resp)=>{
               let result = respond(resp.data.login)
              
               if(result.type==="error"){
                   this.errorMessage=result.text
                   this.showError=true
                   
                   
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
.container{
    display: flex;
    flex-direction: row;     /* make main axis horizontal (default setting) */
    justify-content: center; /* center items horizontally, in this case */
    align-items: center;     /* center items vertically, in this case */
    height: 400px
}
.cont{
  display:flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  border: 2px solid aqua;
  border-radius: 5px;
  padding: 3px;
  width:250px;
  height: 350px;

}

</style>