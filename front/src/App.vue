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
         <div class="des">
           <h3>Что это?</h3>
           <p>Инструмент поможет вам обработать большой объём текстовой информации различной специфики и выделить ключевую информацию.</p>
           <v-row justify="center">
           <v-img max-height="150" max-width="1000" class="img" src="@/assets/action.png"/>
           </v-row>
           <v-row>
             <v-col class="comment">
                <h4>Большой текст</h4>
             </v-col>
              <v-col class="comment">
              <h4>=></h4>
            </v-col>
             <v-col class="comment">
               <h4>Краткое резюме</h4>
             </v-col>
           </v-row> 
           <h3>Как это работает?</h3>
           <p>Наши модели машинного обучения основаны на экстрактивном подходе, который подразумевает под собой извлечение ключевых предложений из документа. Данный подход включает техники ранжирования
            ключевых предложений по важности (которая оценивается через различные метрики), после чего выбирается N наиболее релевантных предложений.</p>
            <v-row justify="center">
          <v-img max-height="250"  max-width="800" class="img" src="@/assets/action2.png"/>
          </v-row>
          <h4 class="comment">Экстрактивная суммаризация</h4>
          <h3>Как этим пользоваться?</h3>
         <p> 1. Вставьте необходимый текст в поле ниже.</p>
           <p>2. Выберете % текста, который вы хотите прочитать (по умолчанию = 10%)</p>
           <p>3. Выберете ML-модель (по умолчанию = LDA)</p>
         </div>
          <v-row class="row">
            <v-col>
            <h3  >Количество выделяемых предложений(%):</h3>
            </v-col>

            <v-col>
            <h3  >Выбор нужной модели:</h3>
            </v-col>
          </v-row>

         <v-row class="row">
            <v-col>
            <v-slider 
              hint="Количество выделяемых предложений"
              max="100"
              min="0"
              thumb-label
              v-model="amount"
            ></v-slider>
          </v-col>
          <v-col>
            <v-select
            
              :items="items"
              label="Model"
              v-model="model"
            ></v-select>
          </v-col>
        </v-row>
        <v-row  justify="end">
              <country-flag class="flag" country='ru'/>
              <country-flag class="flag" country='gb'/>
        </v-row>
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
          <span v-if="resp!='' && resp!=null" >Результат:</span>
          <br>
          <v-card-text v-html="resp"></v-card-text>
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
import CountryFlag from 'vue-country-flag'
import axios from "axios";
  export default {
    components:{
      "nav-content":NavContent,
       CountryFlag
    },
    data() {
      return{ 
        drawer: null,
        text:"",
        resp:"",
        items:["Tf","Tfidf","Lda"],
        amount:10,
        model:"Lda",
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
           url: "http://localhost:8081/message",
           data: {
             id:1,
             input_text:this.text,
             sentence_count:this.amount,
             type:this.model
           }
         }).then(response => {
        this.resp = response.data.output_text;
         });
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
.slider{
  width:50%;
  display:inline-block;
}
.row{
  padding:20px;
}
.des{
  padding-left:2%;
  padding-right:2%;
}

.comment{
  text-align:center;
}
.flag{
  width:60px;
}
.img{
  text-align:center;
  align-content:  center;
}
</style>