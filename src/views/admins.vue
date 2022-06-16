<template>
    <div class="container">
        <div class="cont">
        <div class="toprow">
            <button type="button" class="btn btn-primary" >Add New</button>
        </div>
        <table class="table table-sm">
            <thead>
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Surname</th>
                    <th scope="col">Facility</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="admin in admins" :key="admin.username"> 
                    <td>{{admin.name}}</td>
                    <td>{{admin.surname}}</td>
                    <td>{{admin.code}}</td>
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
        this.$store.dispatch('getAdmins')
    },
    computed:{
        ...mapState(['admins'])
    },
    data(){
        return{

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