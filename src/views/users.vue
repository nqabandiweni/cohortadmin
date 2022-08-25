<template>
    <div class="container">
        <div class="cont">
        <div class="toprow">
                <div v-if="shownote" class="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-person-fill me-2" viewBox="0 0 16 16">
                        <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                    </svg>
                    <div>
                        {{account}}
                    </div>
                    
                    <button type="button" @click="shownote=false" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
                <div v-if="shownote" class="alert alert-primary d-flex align-items-center" role="alert">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-key-fill me-2" viewBox="0 0 16 16">
                        <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                    </svg>
                    <div>
                        {{temporaryPassword}}
                    </div>
                    <button type="button" @click="shownote=false" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            <div class="add">
                <button type="button" class="btn btn-primary btn-sm" @click="create()" >Add New</button>
            </div>
        </div>
        <table class="table table-sm table-hover table-responsive">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Facility</th>
                    <th scope="col">Role</th>
                    <th scope="col">Delete</th>
                    <th scope="col">Forgot Password</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in myusers" :key="user.username"> 
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.code}}</td>
                    <td>{{user.role}}</td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-danger" data-bs-toggle="modal"  data-bs-target="#deleteModal" @click="setEmail(user.email)" ><i class="bi bi-trash-fill"></i>Delete</button>
                        
                    </td>
                    <td>
                        <button type="button" class="btn btn-sm btn-outline-danger" @click="resetPassword(user.email)">
                            <span v-if="isLoading" class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
                            <span >
                                <i class="bi bi-key-fill"></i>
                            </span>
                            Reset
                        </button>
                    </td>
                    
                </tr>
            </tbody>
        </table>
        </div>
 <!-- Modal -->
<div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Delete Confirmation</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        Are You Sure You Want To Delete <span class="badge rounded-pill bg-info text-dark">{{email}}</span>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-danger" data-bs-dismiss="modal" @click="remove()">Delete</button>
      </div>
    </div>
  </div>
</div>
    </div>
</template>
<script>
import {mapGetters, mapState} from 'vuex'
import {respond} from '../utils/handleResponses'
export default {
    created(){
        this.$store.dispatch('getUsers')
    },
    computed:{
        ...mapGetters(['myusers']),
        ...mapState(['isLoading'])
    },
    data(){
        return{
            shownote:false,
            temporaryPassword:"",
            account:"",
            email:""

        }
    },
    methods:{
        setEmail(email){
            this.email=email
        },
        create(){
            this.$router.push("/createUser")
        },
        remove(){
            this.$store.dispatch('deleteUser',{email:this.email})
                .then(this.$router.go())

        },
        resetPassword(email){
            this.$store.dispatch('resetPassword',{email})
            .then((resp)=>{
                let result = respond(resp.data.resetPassword)
                this.temporaryPassword=result.text
                this.account=email
                this.shownote=true
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
    
}
.cont{
    display:flex;
    flex-direction: column;
    width:100%;
}
.toprow{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.details{
    display: flex;
    flex: 1

}

</style>