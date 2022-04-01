<template>
    <div class="container">
        <div class="visit">
            <date-picker v-model="appointment.visit" type="date" value-type="DD-MM-YYYY"></date-picker>
        </div>
        <button  class="btn btn-success" @click="addCohort()"><i class="bi bi-plus"/>Add Cohort</button>
        <div class="cohortsrow">
            <div v-if="newCohorts.length>0" class="cohorts">
                <span> New Cohorts:</span>
                <div v-for="(nc,index) in newCohorts"   :key="index"  class="newcohort">
                    <div>
                        <select class=" month form-select form-select-xs" v-model="newCohorts[index].month">
                            <option v-for="month in months" :value="month" :key="month" >
                                {{ month}}
                            </option>
                        </select>
                    </div>
                    <div>
                        <select class=" year form-select form-select-xs" v-model="newCohorts[index].year">
                            <option v-for="year in years" :value="year" :key="year" >
                                {{ year}}
                            </option>
                        </select>
                    </div>
                    <div class="removenew" @click="removeNew(index)">
                        <i class="bi bi-trash-fill"></i>
                    </div>
                </div>
            </div>
        </div>
               <button  class="btn btn-success"  @click="send()"><i class="bi bi-plus"/>send</button>
    </div>
    
</template>
<script>
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    created(){
        this.editing=this.appointment
        this.fillYears()
    },
    data(){
        return{
            appointment:{
                visit:"",
                cohorts:[]
            },
            years:[],
            months:["January","February","March","April","May","June","July","August","September","October","November","December"],
            newCohorts:[]

        }
    },
    methods:{
        addCohort:function(){
            this.newCohorts.push({
                month:"",
                year:null})
        },
        removeNew:function(index){
          this.newCohorts.splice(index,1)  
        },
        fillYears(){
            var  y=[]
            for(var i =2000;i<=2030;i++){
                y.push(i)
            }
            this.years = y
        },
        send(){
             var cohorts = this.newCohorts.filter(function(a){
                var key = a.month + '|' + a.year;
                if(!this[key]){
                    this[key]=true;
                    return true;
                }
            },Object.create(null));
            this.appointment.cohorts= cohorts
            this.$store.dispatch('createAppointment',this.appointment)
                .then(this.$router.push('/appointments'))
                .catch(err => console.log(err))
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
    border-radius: 5px;
}
.visit{
    margin-bottom: 5px;
}
.cohortsrow{
    display: flex;
    justify-content: space-evenly;
    align-content: center;
    padding: 15px;
    border-radius: 5px;
    overflow-y: auto;
    height: 250px;
    min-width: 700px;
    border: 1px solid cadetblue;
    margin-top: 5px;
    margin-bottom: 5px;
}
.cohort{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    width: 200px;
    margin-bottom: 5px;
    border: 1px solid skyblue;
    border-radius: 5px;
}
.cohortmonth{
     display: flex;
     justify-content: space-evenly;
     align-items: center;
     width: 110px;
   
}
.cohortyear{
      display: flex;
     justify-content: space-evenly;
     align-items: center;
     border-left: 2px solid skyblue;
     width: 60px;
 
}
.cohortaction{
    display: flex;
     justify-content: space-around;
     align-items: center;
     border-radius: 5px;
     border: 2px solid red;
     width: 30px;
}
.newcohort{
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 300px;
    margin-bottom: 5px;
    border-radius: 5px;
}
.cohorts{
    overflow-y: auto;
}
.removenew{
    border: 2px solid red;
    border-radius: 5px;
    width: 30px;
    height: 30px;
}
</style>