<template>
    <div class="container">
        <div class="visit">
            <input v-model="editing.visit" type="text"  readonly>
        </div>
        <button  class="btn btn-success" @click="addCohort()"><i class="bi bi-plus"/>Add Cohort</button>
        <div class="cohortsrow">
            <div class="cohorts">
                <span>Cohorts:</span>
                <div v-for="(cohort,index) in editing.cohorts"   :key="index"  class="cohort">
                    <div class="cohortmonth">{{cohort.month}}</div>
                    <div class="cohortyear">{{cohort.year}}</div>
                    <div class="cohortaction" @click="remove(index)"> <i class="bi bi-trash-fill"></i> </div> 
                    
                </div>
            </div>
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
               <button  class="btn btn-success" @click="sendEdited()"><i class="bi bi-plus"/>send</button>
        
    </div>
    
</template>
<script>
export default {
    name:'editAppointment',
    props:['appointment'],
    created(){
        this.editing=this.appointment
        this.fillYears()
        

    },
    data(){
        return{
           
            months:["January","February","March","April","May","June","July","August","September","October","November","December"],
            editing:{},
            years:[],
            newCohorts:[],
            edited:{
                visit:"",
                cohorts:[]
            },
            duplicates:[]
        }
    },
    methods:{
        remove:function(index){
            this.editing.cohorts.splice(index,1)
        },
        removeNew:function(index){
          this.newCohorts.splice(index,1)  
        },
        addCohort:function(){
            this.newCohorts.push({
                month:"",
                year:null})
        },
        sendEdited:function(){
             this.edited.visit=this.editing.visit
             for(var i=0;i<this.editing.cohorts.length;i++){
                this.newCohorts.push({
                    month:this.editing.cohorts[i].month,
                    year:this.editing.cohorts[i].year
                                        })
            }
            console.log("hi")
             var cohorts = this.newCohorts.filter(function(a){
                var key = a.month + '|' + a.year;
                if(!this[key]){
                    this[key]=true;
                    return true;
                }
            },Object.create(null));

            this.edited.cohorts= cohorts
            this.$store.dispatch('updateAppointment',this.edited)
                .then(this.$router.push('/'))
                .catch(err => {this.errors=err})

        },
        fillYears(){
            var  y=[]
            for(var i =2000;i<=2030;i++){
                y.push(i)
            }
            this.years = y
        }
    }
    
}
</script>
<style scoped>
.container{
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-content: center;
    align-items: center;
    min-height: 400px;
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