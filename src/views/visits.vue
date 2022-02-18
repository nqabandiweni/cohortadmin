<template>
  <div class="home">
    <div class="cont">
      <div class="box">
        <span class=" lbl badge rounded-pill bg-primary">Select Cohort Below</span>
        <div class="top">
      
          <select class=" month form-select form-select-xs" v-model="cohort.month">
            <option v-for="month in months" :value="month" :key="month" >
              {{ month}}
            </option>
          </select>
           <select class=" year form-select form-select-xs" v-model="cohort.year">
            <option v-for="year in years" :value="year" :key="year" >
              {{ year}}
            </option>
          </select>
          
        </div>
         <span v-if="visits.length>0" class=" lbl badge rounded-pill bg-success">Appointments for {{cohort.month}} {{cohort.year}} Cohort</span>
         <div class="bottom">
            
            <div class="appointment" :class="{active: reasons(visit)}" v-for="(visit,index) in visits" :key="index"   >
                <div >
                  {{converteDate(visit)}}
                  
                </div>
               
            </div>
         </div>
      </div>
    
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import {mapState,mapActions} from 'vuex';
export default {
  name: 'Home',
  created(){
    this.fillYears()
    this.search()
     
  },
  computed :{
    

    
    ...mapState(['visits'])
  },
  data(){
    return{
      borders:[],
      selected:0,
      errors:{},
      years:[],
      months:["January","February","March","April","May","June","July","August","September","October","November","December"],
      cohort:{
        month:"January",
        year: 2000
      }
    }
  },
  watch:{
    cohort: {
        	handler: function () {
                this.search()
            },
            deep: true
        },
  },
  methods:{
    
    search(){
     this.$store.dispatch('fetchVisits',{...this.cohort})
            .then()
            .catch(err => {this.errors=err})
    },
    
    fillYears(){
      {
     var  y=[]
      for(var i =2000;i<=2030;i++){
        y.push(i)
      }
      this.years = y
    }

    },
    converteDate(date_str){
      var  temp_date = date_str.split("-")
        return temp_date[0] + " " + this.months[Number(temp_date[1]-1)] + " "+ temp_date[2]
    },
    reasons(date_str){
        var  temp_date = date_str.split("-")
        if(this.months[Number(temp_date[1]-1)]=== this.cohort.month){
            return true
        }else{ return false}
    }
    
  }
}
</script>
<style scoped>
.month{
  margin-left: 5px;
  margin-right: 5px;
}
.year{
  margin-left: 5px;
  margin-right: 6px;

}
.search{
  margin-left: 5px;
  margin-right: 5px;
}
.cont{
  display: flex;
  
  justify-content: center;
  align-content: center;
  margin-top: 70px;
 
}
.box{
  display: flex;
  flex-direction: column;
  
   border-radius: 5px;
   width:500px;
   height:200px;
}
.top{
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 80px;
  border-radius: 5px;
}
.lbl{
  margin:3px;
}
.bottom{
  display: flex;
  min-height: 100px;
  padding: 3px;
  border-radius: 5px;
  overflow-x: auto;
}
.appointment{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid;
  border-color: green;
  height: 80px;
  width: 90px;
  margin: 5px;
  border-radius: 3px;
}
.reasons{
  display: flex;
  padding-left: 20px;
  border: 1px solid green;
  min-height: 30px;
  width: 200px;
  margin: 5px;
  border-radius: 3px;

}
.active{
  border: 2px solid red;
}

</style>