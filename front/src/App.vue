<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <nav-content></nav-content>
    </v-navigation-drawer>

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Text summarization</v-toolbar-title>
      
    </v-app-bar>

    <v-main>
       <v-container fluid>
        <v-card
        class="card"
        elevation=7
        >
          <v-textarea
          placeholder="Введите текст"
          clearable
          clear-icon="mdi-close-circle"
          v-model="text"
          />
        </v-card>
        <v-row
        align="center"
        justify="space-around">
          <p class="counter">Ограничение по предложениям:  {{countSent}}/30000</p>
        </v-row>
        <v-row
        align="center"
        justify="space-around">
            <v-btn
                class="btn"
                color="primary"
                elevation="7"
                large
                @click="sendText()">
                Action
            </v-btn>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import NavContent from './views/NavContent.vue';
const axios = require('axios');
  export default {
    components:{
      "nav-content":NavContent
    },
    data() {
      return{ 
        drawer: null,
        text:"",
        resp:""
      }
      
    },
    computed:{
      countSent(){
        if(this.text=="" || this.text == null)
          return 0;
        return this.text.split('.').length-1;
      },
      alarm(){
        return this.countSent>=30000;
      }
    },
    methods:{
     async sendText(){
        if(this.alarm){
        alert("Введено слишком много предложений!"); 
        }
        else{
        await axios({
           method:'post',
           url: "http://localhost:8080/",
           data: {
             id:1,
             input_text:this.text
           }

         }).then(response => {
        this.resp = response.data.output_text;
         });
          console.log(this.resp);
        }
    }
  }
}
</script>

<style scoped>
.card{
  padding: 15px;
}
.btn{
  margin-top: 5%;
  width:200px;
}
.counter{
  font-size:20px;
  margin-top: 5%;
}
</style>