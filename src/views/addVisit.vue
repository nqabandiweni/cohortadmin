<template>
    <div>
        <div class="visit">
            <date-picker v-model="appointment.visit" type="date" format="DD-MM-YYYY"></date-picker>
        </div>
        <div class="cohorts">
            <button class="btn btn-success">add</button>
            <div v-for="n in cohortCount" class="cohortrow" :key="n" >
                <input v-model="appointment.cohorts[n-1].month"/> <input />
            </div>
            
        </div>
    </div>
</template>
<script>
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
export default {
    components: { DatePicker },
    data(){
        return{
            cohortCount:3,
            appointment:{
                visit:"",
                cohorts:[]
            }
        }
    }
    
}
</script>
<style scoped>
.visit{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 5px;
}
.cohorts{
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: 250px;
}
</style>