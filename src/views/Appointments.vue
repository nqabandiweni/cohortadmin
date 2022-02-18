<template>
    <div class="container">
        <div class="toprow">
            <button type="button" class="btn btn-primary">Add</button>
            <date-picker v-model="search" type="date" format="DD-MM-YYYY"></date-picker>
        </div>
        <div  class="appointments">
            <div v-for="appointment in Appointments" :key="appointment.visit"   class="appointment">
                <div class="visit">{{converteDate(appointment.visit)}}</div>
                <div class="cohortcount">Total cohorts: {{appointment.cohorts.length}}</div>
                <div class="actions"> 
                    <button type="button" class="btn btn-danger btn-sm">Delete</button>
                    <router-link :to="{ name: 'editAppointment', params: { appointment:appointment }}">
                        <button type="button"  class="btn btn-warning btn-sm">Edit</button>
                    </router-link>
                </div>
            </div>

        </div>
    </div>
  
</template>

<script>
import {mapState} from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    created(){
        this.populate()
    },
    computed:{
        ...mapState(['Appointments'])
    },
    data(){
        return{
            search:"",
            months:["January","February","March","April","May","June","July","August","September","October","November","December"]
        }
    },
    methods:{
        populate(){
            this.$store.dispatch('fetchAllAppointments')
        },
        converteDate(date_str){
            var  temp_date = date_str.split("-")
            return temp_date[0] + " " + this.months[Number(temp_date[1]-1)] + " "+ temp_date[2]
        }
    }

}
</script>

<style scoped>
.container{
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 400px;
    width: 70%;
    border: 3px solid cadetblue;
    border-radius: 5px;
    
}
.toprow{
    display: flex;
    width: 100%;
    height: 35px;
    justify-content: space-evenly;
    flex-direction: row-reverse;
    margin-top: 10px;
    margin-bottom: 15px;
    
}
.appointments{
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    padding-top: 10px;
    padding-bottom: 10px;
    width: 75%;
    height: 80%;
    border-radius: 5px;
    overflow-y: auto;
}
.appointment{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 600px;
    margin-bottom: 5px;
    border: 1px solid skyblue;
    border-radius: 5px;
}
.visit{
     display: flex;
     justify-content: space-evenly;
     align-items: center;
     width: 200px;
}
.cohortcount{
      display: flex;
     justify-content: space-evenly;
     align-items: center;
     border-left: 2px solid skyblue;
     width: 200px;
}
.actions{
     display: flex;
     justify-content: space-evenly;
     border-left: 2px solid skyblue;
     width: 200px;
     padding: 2px;
}

</style>