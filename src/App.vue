<template>
  <div id="app">
    <div id="nav">
      <router-link  v-if="isLoggedIn" to="/visits">Visits</router-link>|
      <router-link  v-if="isLoggedIn" to="/appointments">Appointments</router-link>|
      <button v-if="isLoggedIn" type="submit" class="btn btn-primary mt-3" @click="logout()">Logout</button>
    </div>
    <router-view/>
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
    ...mapGetters(['isLoggedIn'])
  },
  methods:{
    logout:function(){
      this.$store.dispatch('logout').then(() => {
            
            this.$router.replace("/");
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
  color: #42b983;
}
</style>
