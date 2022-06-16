<template>
    <div class="container">
        <div class="toprow">
            <button type="button" class="btn btn-primary" @click=create()>Add</button>
                <date-picker v-model="search" type="date"  value-type="DD-MM-YYYY"></date-picker>
          
        </div>
        
        <div  class="appointments">
            <div v-for="(appointment,index) in Appointments" :key="appointment.visit"   class="appointment">
                <div class="visit">{{converteDate(appointment.visit)}}</div>
                <div class="cohortcount">Total cohorts: {{total[index]}}</div>
                <div class="actions"> 
                    <button type="button" class="btn btn-danger btn-sm" data-bs-toggle="modal"  data-bs-target="#deleteModal" @click="setVisit(appointment.visit)">Delete</button>
                    <router-link :to="{ name: 'editAppointment', params: { appointment:appointment }}">
                        <button type="button"  class="btn btn-warning btn-sm">Edit</button>
                    </router-link>
                </div>
            </div>

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
        Are You Sure You Want To Delete <span class="badge rounded-pill bg-info text-dark">{{visit}}</span>
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
import {mapState} from 'vuex'
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    created(){
        this.populate()
       
    },
    computed:{
        ...mapState(['Appointments']),
        total:function(){
            return this.Appointments.map(
                item => item.cohorts.length
            );
        }
    },
    data(){
        return{
            visit:"",
            search:"",
            months:["January","February","March","April","May","June","July","August","September","October","November","December"]
        }
    },
    methods:{
        populate(){
    
            this.$store.dispatch('fetchAllAppointments')
           
        },
        create(){
            this.$router.push("/createAppointment")
        },
        converteDate(date_str){
            var  temp_date = date_str.split("-")
            return temp_date[0] + " " + this.months[Number(temp_date[1]-1)] + " "+ temp_date[2]
        },
        setVisit(visit){
            this.visit=visit
        },
        remove(){
            this.$store.dispatch('deleteAppointment',this.visit)
                .then(this.$router.go())
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