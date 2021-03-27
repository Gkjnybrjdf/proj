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
              :disabled="file!=null"
              />
              <v-row v-if="this.resp">
                <span class="cond" style="margin-right:1%">Весь текст</span>
                <v-switch
                v-model="selected"
              ></v-switch>
                <span class="cond" style="margin-left:1%">Ключевой текст</span>
                <v-col>
                </v-col>
                <v-col>
                  <v-select
                  class="download"
                  :items="formats"
                  v-model="format"
                  label="Format for download file"
                ></v-select>
                 <v-btn
                  class="download"
                  color="primary"
                  elevation="7"
                  large
                  :loading="waitingFile"
                  @click="downloadText()">
                  Выгрузить фаил
              </v-btn>
                </v-col>
              </v-row>
              <span v-if="resp!='' && resp!=null" >Результат:</span>
              <br>
              <v-card-text >
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
                  :loading="waitingOutput"
                  @click="sendText()"
                  :disabled="text=='' && file==null "
                  >
                  Action

              </v-btn>
            </v-row>
        </v-container>
</template>
<script>
import CountryFlag from 'vue-country-flag'
import axios from "axios";

export default {
  components: {
    CountryFlag
  },
  data() {
    return {
      text: "",
      resp: "",
      respSelected: "",
      items: ["TF", "TF-IDF", "LDA"],
      formats: ['TXT', 'DOCX'],
      format: null,
      amount: 10,
      model: "LDA",
      type: null,
      selected: false,
      file: null,
      waitingOutput: false,
      waitingFile: false,
    }

  },
  computed: {
    countSent() {
      if (this.text == "" || this.text == null)
        return 0;
      return this.text.split('.').length - 1;
    },
    alarm() {
      return this.countSent >= 30000;
    }
  },
  methods: {
    async downloadText(){
      this.waitingFile = true
      let data = new FormData()
      data.append("file_type", this.format)
      data.append("output_text", this.selected ? this.respSelected : this.resp)
      await axios({
        method: 'post',
        url: "http://localhost:8081/file/download",
        data: data,
        responseType: 'blob'
      })
          .then(resp => {
            const url = window.URL.createObjectURL(new Blob([resp.data]))
            const link = document.createElement('a')
            link.href = url
            link.setAttribute('download', `file_name.${this.format.toLowerCase()}`)
            document.body.appendChild(link)
            link.click()
          })
      .finally(() => {
        this.waitingFile = false
      })
    },
    async sendText() {
      if (this.alarm) {
        alert("Введено слишком много предложений!");
      } else {
        if (this.model === "TF")
          this.type = "Tf";
        if (this.model === "TF-IDF")
          this.type = "Tfidf";
        if (this.model === "LDA")
          this.type = "Lda";

        let response = undefined
        this.waitingOutput = true
        if (this.file) {
          let data = new FormData()
          data.append("sentence_count", this.amount)
          data.append("type", this.type)
          data.append("file", this.file)
          response = await axios({
            method: 'post',
            url: "http://localhost:8081/file/upload",
            data: data
          })
        } else {
          response = await axios({
            method: 'post',
            url: "http://localhost:8081/message",
            data: {
              id: 1,
              input_text: this.text,
              sentence_count: this.amount,
              type: this.type
            }
          })
        }
        this.resp = response.data.output_text;
        this.respSelected = this.resp.split('.').filter(x => x.startsWith(' <s')).join('. ');
        this.waitingOutput = false
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
}
.download{
  display:inline-block;
}
.send{
  position:fixed;
  width:200px;
  height:100px;
  bottom:5vh;
  right:5vh;
}
</style>