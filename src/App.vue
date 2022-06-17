<template>
  <div id="app">
    <nav v-if="isLoggedIn"  class="navbar fixed-top navbar-dark bg-dark " style="background-color: #b8b0c7;">
      <a class="navbar-brand" href="#">ECOHORT</a>
      <a class="nav-item nav-link" href="/visits">Visits</a>
      <a class="nav-item nav-link" href="/appointments">Appointments</a>
       <a class="nav-item nav-link" href="/users">Users</a>
      <a class="nav-item nav-link" href="/appointments">Facilities</a>
      <div class="username">{{username}}</div>
      <button v-if="isLoggedIn" type="submit" class="btn btn-primary " style="margin-right: 2%;" @click="logout()">Logout</button>
    </nav>
   
    <div class="view">
    <router-view/>
    </div>
  </div>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  data(){
    return{

    }
  },
  computed:{
    ...mapGetters(['isLoggedIn','role','username'])
  },
  methods:{
    logout:function(){
      this.$store.dispatch('logout').then(() => {
            
            this.$router.push("/");
          });
    }
  }
  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #b8b0c7;
}
.view{
  margin-top: 100px;
}
.routerLink{
     text-decoration: none;
 }
 .username{
   border: 2px dotted blue;
   background-color: white;
   border-radius: 5px ;
   padding: 1px;
   color: black;
 }

</style>
