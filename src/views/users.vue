<template>
    <div class="container">
        <div class="cont">
        <div class="toprow">
            <button type="button" class="btn btn-primary" @click="create()" >Add New</button>
        </div>
        <table class="table table-sm table-hover table-responsive">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Facility</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.username"> 
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.code}}</td>
                    <td>{{user.role}}</td>
                </tr>
            </tbody>
        </table>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
export default {
    created(){
        this.$store.dispatch('getUsers')
    },
    computed:{
        ...mapState(['users'])
    },
    data(){
        return{

        }
    },
    methods:{
        create(){
            this.$router.push("/createUser")
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
    justify-content: flex-end;
}
</style>