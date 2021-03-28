<template>
    <div class="container">
        <h4>Количество выделяемых предложений(%):</h4>
        <v-slider 
                  hint="Количество выделяемых предложений"
                  max="100"
                  min="0"
                  thumb-label
                  v-model="percentSelected"
        ></v-slider>
         <h4  >Выбор нужной модели:</h4>
         <v-select
                  :items="items"
                  label="Model"
                  v-model="model"
        ></v-select>
        <h4  >Сохранить как:</h4>
        <v-radio-group v-model="formatValue">
        <v-radio
            v-for="n in formats"
            :key="n"
            :label="n"
            :value="n"
        ></v-radio>
        </v-radio-group>

        <h2 class="model">ML Models:</h2>

        
        <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"

      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="dialog"
          >LDA</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >LDA</v-toolbar>
            <v-card-text>
              <div class="pa-12" v-html="lda_text"></div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

       <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="dialog"
          >TF-IDF</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >TF-IDF</v-toolbar>
            <v-card-text>
              <div class="pa-12" v-html="tfidf_text1"></div>
                <v-img    class="img" src="@/assets/image2.png"/>
                <div class="pa-12" v-html="tfidf_text2"></div>
                <v-img    class="img" height="60px" src="@/assets/image3.png"/>
                 <div class="pa-12" v-html="tfidf_text3"></div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>

       <v-dialog
        transition="dialog-bottom-transition"
        max-width="700"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-bind="attrs"
            v-on="on"
            class="dialog"
          >TF</v-btn>
        </template>
        <template v-slot:default="dialog">
          <v-card>
            <v-toolbar
              color="primary"
              dark
            >TF</v-toolbar>
            <v-card-text>
              <div class="pa-12" v-html="tf_text1"></div>
              <v-img   class="img" height="60px" src="@/assets/image1.png"/>
              <div class="pa-12" v-html="tf_text2"></div>
            </v-card-text>
            <v-card-actions class="justify-end">
              <v-btn
                text
                @click="dialog.value = false"
              >Close</v-btn>
            </v-card-actions>
          </v-card>
        </template>
      </v-dialog>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {

    data(){
        return {
            formatValue:"",
            model:"LDA",
            percentSelected:10,
            lda_text:"<p>LDA (Latent Dirichlet Allocation - Модель латентного размещения Дирихле) принадлежит семейству порождающий вероятностных моделей, в которых темы представлены вероятностями появления каждого слова из заданного набора. В LDA распределение тем следует распределению Дирихле. Документы в свою очередь могут быть представлены как сочетания тем. Уникальная особенность моделей LDA состоит в том что темы не обязательно должны быть различными и слова могут встречаться в нескольких темах; это придает некоторую нечеткость определяемым темам, что может пригодиться для совладения с гибкостью языка.</p>"+
"<p>Например, если наблюдениями являются слова, собранные в документы, утверждается, что каждый документ представляет собой смесь небольшого количества тем и что появление каждого слова связано с одной из тем документа.</p>"+
"<p>К примеру, модель может иметь тематики классифицируемые как &laquo;относящиеся к кошкам&raquo; и &laquo;относящиеся к собакам&raquo;, тематика обладает вероятностями генерировать различные слова, такие как &laquo;мяу&raquo;, &laquo;молоко&raquo; или &laquo;котёнок&raquo;, которые можно было бы классифицировать как &laquo;относящиеся к кошкам&raquo;, а слова, не обладающие особой значимостью (к примеру, служебные слова), будут обладать примерно равной вероятностью в различных тематиках.</p>"+
"<p><em>(В нашем приложении под документом понимается текст)</em></p>",
            tfidf_text1:"<p>TF (term frequency) - это частотность термина, которая измеряет, насколько часто термин встречается в документе. Логично предположить, что в длинных документах термин может встретиться в больших количествах, чем в коротких, поэтому абсолютные числа не используются. Применяют относительные &mdash; делят количество раз, когда нужный термин встретился в тексте, на общее количество слов в тексте.</p>"+
"<p>TF&nbsp;<em>термина а</em>&nbsp;= (Количество раз, когда термин&nbsp;<span>а</span>&nbsp;встретился в тексте / количество всех слов в тексте)**</p>",
            tfidf_text2:"<p>Логарифм можно брать любой — потому что TF-IDF является относительной мерой; то есть веса терминов не выражаются в каких-то единицах, а существуют друг относительно друга.</p>",
            tfidf_text3:"<p><em>(В нашем приложении под документом понимается текст)</em></p>",
            tf_text1:"<p>TF (term frequency) - это частотность термина, которая измеряет, насколько часто термин встречается в документе. Логично предположить, что в длинных документах термин может встретиться в больших количествах, чем в коротких, поэтому абсолютные числа не используются. Применяют относительные &mdash; делят количество раз, когда нужный термин встретился в тексте, на общее количество слов в тексте.</p>"+
"<p>TF&nbsp;<em>термина а</em>&nbsp;= (Количество раз, когда термин&nbsp;<span>а</span>&nbsp;встретился в тексте / количество всех слов в тексте)**</p>",
            tf_text2:"<p><em>(В нашем приложении под документом понимается текст)</em></p>",
            
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
    },
    watch:{
      model(){
      if(this.model=="TF")
           this.$store.dispatch('changeType',"Tf");
      if(this.model=="TF-IDF")
            this.$store.dispatch('changeType',"Tfidf");
      if(this.model=="LDA")
            this.$store.dispatch('changeType',"Lda");
        },
            percentSelected(){
       this.$store.dispatch('changeAmount',this.percentSelected);
            },
       async formatValue(){
         console.log(this.formatValue)
          this.$store.dispatch('changeFormat',this.formatValue);
          await this.$store.dispatch('downloadText');
          this.formatValue=null;
        }
    },
    
}


</script>

<style>
.splitter{
    margin-top:2%;
    margin-bottom:2%;
}
.avatar{
    margin:2%;
}
.row-login{
    height:100px;
}
.container{
    margin-left:20px;
    margin-top:10px;
}
.arrow{
    margin:auto;
}
.dec{
    text-decoration: none;
}
.dialog{
    width:100%;
    margin-top:20px;
}
.img{
  text-align:center;
  align-content:center;
  margin:auto;

}
</style>