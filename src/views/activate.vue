<template>
    <div class="container">
        <div class="cont">
                
                <p >User Activation Form</p>
                <div v-if="shownote"  class=" right alert alert-dismissible fade show" :class="alerttype" role="alert">
                    {{message}}
                <button @click="shownote=false" type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div class="line">
                    <div class="form-group">
                        <small id="emailHelp" class="form-text text-muted">Your email</small>
                        <input v-model="email" type="text" placeholder="email"  class="form-control"  >
                    </div>
                    <div class="form-group">
                        <small id="passHelp" class="form-text text-muted"> Never share Your Password</small>
                        <input type="text" v-model="temporaryPassword" placeholder="Temporary Password"  class="form-control" id="exampleInputPassword2"  aria-describedby="passHelp">
                    </div>
                </div>
                <div class="line">
                    <div class="form-group" >
                        <small id="passHelp" class="form-text text-muted"> Never share Your Password</small>
                        <input type="password" v-model="password" placeholder="New Password"  class="form-control" id="exampleInputPassword3"  aria-describedby="passHelp">
                    </div>
                    <div class="form-group" >
                        <small id="passHelp" class="form-text text-muted"> Never share Your Password</small>
                        <input type="password" v-model="confirmPassword" placeholder="Confirm Password"  class="form-control" id="exampleInputPassword4"  aria-describedby="passHelp">
                    </div> 
                </div>
                <div class="line my-3">
                    <div>
                        <button type="submit" @click="activate()" class="btn btn-primary">
                            Activate Account
                            <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                        </button>
                    </div>
                    <div>
                        <router-link to="/">Login</router-link>
                    </div>
                </div>
                
        </div>
    </div>
</template>
<script>
import {respond} from '../utils/handleResponses'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            alerttype:'alert-info',
            message:"",
            shownote:false,
            email:"",
            password:"",
            temporaryPassword:"",
            confirmPassword:""
        }
        
    },
    computed:{
        ...mapState(['isLoading'])

    },
    methods:{
        notification(type,text){
            type=='success'?this.alerttype= 'alert-info':this.alerttype= 'alert-warning'
            this.message=text
            this.shownote=true
            
        },
        activate:function(){
            this.$store.dispatch('activate',{email:this.email,password:this.password,temporaryPassword:this.temporaryPassword,confirmPassword:this.confirmPassword})
            .then((resp)=>{
                let result = respond(resp.data.activate)
                this.notification(result.type,result.text)
            })

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
    
}
.cont{
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  width: 500px;
  border:2px solid aqua;
  border-radius: 5px;
  padding: 5px;
  
 
}
.line{
    display: flex;
    flex-direction: row-reverse;
    justify-content: space-evenly;
    padding: 2px;
    margin-top: 2px;
}

</style>