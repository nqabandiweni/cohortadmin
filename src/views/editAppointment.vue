<template>
    <div class="container">
        <div class="visit">
            <input v-model="editing.visit" type="text"  readonly>
        </div>
        <div class="cohorts">
            <div v-for="(cohort,index) in editing.cohorts"   :key="index"  class="cohort">
                {{cohort.month}}-{{cohort.year}}
            </div>
        </div>
        
    </div>
    
</template>
<script>
export default {
    name:'editAppointment',
    props:['appointment'],
    created(){
        this.editing=this.appointment
    },
    data(){
        return{
            editing:{}
        }
    }
    
}
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
}
</style>