<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <nav-content></nav-content>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-icon @click="drawer = !drawer">{{icons}}</v-icon>
       <router-link to="/" class="dec"><v-toolbar-title><h2>Text summarization</h2></v-toolbar-title></router-link>
    </v-app-bar>

    <v-main>
      
         <router-view></router-view>
       
    </v-main>
  </v-app>
</template>

<script>
import NavContent from './views/NavContent.vue';
import { mdiCogs,mdiSigma  } from '@mdi/js'
 export default {
    components:{
      "nav-content":NavContent
    },
    data(){
      return{
        drawer: null,
        icons:mdiCogs,
        name:mdiSigma
      }
    },
    created(){
    }
 }
</script>
<style scoped>
.dec{
    text-decoration: none;
    color:black;
}
.dec:hover{
  color:rgb(41, 41, 163)
}
</style>

