<template>
       <v-container fluid>
         <div class="des">
           <h3>Что это?</h3>
           <p>Инструмент поможет вам обработать большой объём текстовой информации различной специфики и выделить ключевую информацию.</p>
           <v-row justify="center">
           <v-img max-height="250" max-width="700" class="img" src="@/assets/action2.png"/>
           </v-row>
           <v-row justify="center">
             <v-col class="comment">
                <h4 class="undertext">Большой текст </h4>
              <h4 class="undertext"> => </h4>
               <h4 class="undertext" > Краткое резюме </h4>
             </v-col>
           </v-row> 
           <h3>Как это работает?</h3>
           <p>Наши модели машинного обучения основаны на экстрактивном подходе, который подразумевает под собой извлечение ключевых предложений из документа. Данный подход включает техники ранжирования
            ключевых предложений по важности (которая оценивается через различные метрики), после чего выбирается N наиболее релевантных предложений.</p>
            <v-row justify="center">
          <v-img max-height="250"  max-width="900" class="img" src="@/assets/action.png"/>
          </v-row>
          <h4 class="comment">Экстрактивная суммаризация</h4>
          <h3>Как этим пользоваться?</h3>
            <p> 1. Вставьте необходимый текст в поле ниже.</p>
           <p>2. Выберете % текста, который вы хотите прочитать (по умолчанию = 10%)</p>
           <p>3. Выберете ML-модель (по умолчанию = LDA)</p>
          </div>
            <v-row>
             <v-col><h3>Загрузка текста через фаил (.txt .docx)</h3></v-col>
            </v-row>
            <v-row>
              <v-col>
                  <v-file-input
                  counter
                  show-size
                  truncate-length="19"
                  v-model="file"
                  accept=".txt,.docx"
                ></v-file-input>
              </v-col>
           </v-row>
           <v-btn
            elevation="2"
            @click="example"
          >Text example</v-btn>
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
              v-model="inputText"
              :disabled="file!=null"
              />
              <v-row v-if="this.resp">
             <v-col>
              <span v-if="resp!='' && resp!=null" >Результат:</span>
                </v-col>
                <v-col>
                </v-col>
            
                       <span class="cond" style="margin-right:1%">Весь текст</span>
                <v-switch
                v-model="changeView"
              ></v-switch>
                <span class="cond" style="margin-left:1%">Ключевой текст</span>
              </v-row>
              <v-row justify="center">
             <v-progress-circular
                indeterminate
                color="primary"
                v-if="actionSending"
                class="loader"
              ></v-progress-circular>
              </v-row>
              <v-card-text v-if="!actionSending" >
                <span v-if="selected" v-html="respSelected"></span>
                <span v-else v-html="resp"></span>
              </v-card-text>
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
                  class="btn send"
                  color="primary"
                  elevation="7"
                  large
                  @click="sendText()"
                  :disabled="disactiveBtn"
                  >
                  Action
                
              </v-btn>
              <v-btn
                  class="btn clear"
                  color="primary"
                  elevation="7"
                  large
                  @click="clearAll()"
                  :disabled="disactiveBtn"
                  >
                  Delete
                
              </v-btn>
            </v-row>
        </v-container>
</template>

<script>
import CountryFlag from 'vue-country-flag'
import { mapState } from 'vuex';
  export default {
    components:{
       CountryFlag
    },
    data() {
      return{ 
        
        model:"LDA",
        inputText:"",
        percentSelected:10,
        file:null,
        changeView:false,
        actionSending:false
      }
      
    },
    computed:{
      ...mapState({
        text:state=>state.summ.text,
        resp:state=>state.summ.resp,
        amount:state=>state.summ.amount,
        type:state=>state.summ.type,
        respSelected:state=>state.summ.respSelected,
        items:state=>state.summ.items,
        formats:state=>state.summ.formats,
        format:state=>state.summ.format,
        selected:state=>state.summ.selected
      }),
      countSent(){
        if(this.text=="" || this.text == null)
          return 0;
        return this.text.split('.').length-1;
      },
      alarm(){
        return this.countSent>=30000;
      },
      disactiveBtn(){
        return this.inputText=='' && this.file==null ;
      },
    },
    methods:{
     async sendText(){

        if(this.alarm){
        alert("Введено слишком много предложений!"); 
        }
        else{
          this.actionSending=true;
          await this.$store.dispatch('send');
        }
    },
    clearAll(){
      this.inputText="";
      this.file=null;
      this.$store.dispatch('clearAll');
    },
    example(){
      this.inputText="Со́лнце — одна из звёзд нашей Галактики (Млечный Путь) и единственная звезда Солнечной системы. Вокруг Солнца обращаются другие объекты этой системы: планеты и их спутники, карликовые планеты и их спутники, астероиды, метеороиды, кометы и космическая пыль."+
      "По спектральной классификации Солнце относится к типу G2V (жёлтый карлик). Средняя плотность Солнца составляет 1,4 г/см³ (в 1,4 раза больше, чем у воды). Эффективная температура поверхности Солнца — 5780 кельвин[4]. Поэтому Солнце светит почти белым светом, но прямой свет Солнца у поверхности нашей планеты приобретает некоторый жёлтый оттенок из-за более сильного рассеяния и поглощения коротковолновой части спектра атмосферой Земли (при ясном небе, вместе с голубым рассеянным светом от неба, солнечный свет вновь даёт белое освещение)."+
      "Солнечное излучение поддерживает жизнь на Земле (свет необходим для начальных стадий фотосинтеза), определяет климат."
    }
  },
  watch:{
    inputText(){
      this.$store.dispatch('changeText',this.inputText);
    },

    changeView(){
       this.$store.dispatch('changeSelected',this.changeView);
    },
    resp(){
      if(this.resp!="")
        this.actionSending=false;
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
.undertext{
  display:inline-block;
  padding: 5px;
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
  width:800px;
  height: 200px;
}
.cond{
  padding-top:20px;
  color:rgba(128, 126, 126, 0.774);
}
.download{
  display:inline-block;
}
.send{
  position:fixed;
  width:200px;
  height:100px;
  bottom:5vh;
  right:40vh;
}
.clear{
  position:fixed;
  width:200px;
  height:100px;
  bottom:5vh;
  right:5vh;
}
.loader{
  margin:auto;
}
</style>