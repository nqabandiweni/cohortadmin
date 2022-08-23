<template>
    <div class="container">
        <div class="cont">
            <span>User Registration Form</span>
            <div class="line">
                <div v-if="shownote"  class=" right alert alert-dismissible fade show" :class="alerttype" role="alert">
                    {{message}}
                <button type="button" @click="shownote=false" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>

            </div>
            <div class="line">
                <div  v-if="role =='vendor'">
                    <select v-model="usertype" class="form-select">
                        <option value="admin" >Admin</option>
                        <option value="vendor" >Vendor</option>
                    </select>
                </div>
                <div class="right">
                    <input v-model="email" type="email" class="form-control" placeholder="email" aria-label="First name">
                </div>
            </div>
            <div class="line">
                <div>
                    <input v-model="name" type="text" class="form-control" placeholder="First name" aria-label="First name">
                </div>
                <div class="right">
                    <input v-model="surname" type="text" class="form-control" placeholder="Surname" aria-label="Last name">
                </div>
            </div>
            <div class="line">
                <div  v-if="role =='vendor'&& usertype=='admin'">
                    <select v-model="facilityname" class="form-select">
                        <option disabled selected value> -- select a Facility -- </option>
                        <option v-for="f in facilitynames" :key="f" :value="f">{{f}}</option>
                    </select>
                </div>
                <div class="right">
                    <button type="submit" class="btn btn-primary" @click="register()">
                        Register
                        <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                    </button>
                </div>
            </div>
            
        </div>
           
    </div>   
</template>
<script>
import {respond} from '../utils/handleResponses'
import {mapGetters, mapState} from 'vuex'
export default {
    created(){
        this.$store.dispatch('getFacilities')
    },
    computed:{
        ...mapGetters(['role','code']),
        ...mapState(['Facilities','isLoading']),
        facilitynames(){
            return this.Facilities.map((f)=>{return f.name})
        }
    },
    data(){
        return{
            shownote:false,
            alerttype:'alert-info',
            email:'',
            name:'',
            surname:'',
            facilityname:'',
            usertype:"admin",
            message:""

        }
    },
    methods:{
        notification(type,text){
            type=='success'?this.alerttype= 'alert-info':this.alerttype= 'alert-warning'
            this.message=text
            this.shownote=true
            
        },
        register:function(){
            const registrar = this.role
            if(registrar=="admin"){
                this.$store.dispatch('register',{email:this.email,name:this.name,surname:this.surname,role:"user",code:this.code})
                .then((resp)=>{
                     let result = respond(resp.data.register)
                     this.notification(result.type,result.text)    
                })
            }else if(registrar=="vendor"){
                if(this.usertype=="admin"){
                    this.$store.dispatch('register',{email:this.email,name:this.name,surname:this.surname,role:this.usertype,code:this.getFacilityCode()})
                    .then((resp)=>{
                        
                        let result = respond(resp.data.register)
                       
                        this.notification(result.type,result.text)    
                    })
                }else{
                    this.$store.dispatch('register',{email:this.email,name:this.name,surname:this.surname,role:this.usertype,code:"vendor"})
                    .then((resp)=>{
                        let result = respond(resp.data.register)
                        this.notification(result.type,result.text)    
                        
                    })
                }
                
            }

            },
            getFacilityCode:function(){
                let code = ''
                for(var i=0;i<this.Facilities.length;i++){
                    if(this.Facilities[i].name==this.facilityname){
                        code=this.Facilities[i].code
                    }
                }
                return code 
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
  align-items: space-between;
  border: 2px solid aqua;
  border-radius: 5px;
  padding: 3px;
}
.line{
    display: flex;
    flex-flow: row nowrap;
    margin: 3%;
}
.right{
    margin-left: 2%;
}

</style>