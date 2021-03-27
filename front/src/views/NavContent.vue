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
        <v-radio-group v-model="format">
        <v-radio
            v-for="n in formats"
            :key="n"
            :label="`${n}`"
            :value="n"
        ></v-radio>
        </v-radio-group>

        <h2 class="model">ML Models:</h2>
        <v-divider class="splitter"></v-divider>
        <router-link to="/info/1" class="dec">
        <span c>TF</span><v-icon  class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link >

        <v-divider class="splitter"></v-divider>
        <router-link  to="/info/2"  class="dec">
        <span >TF-IDF</span><v-icon  class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link>

        <router-link  to="/info/3"  class="dec">
        <v-divider class="splitter"></v-divider>
        <span >LDA</span><v-icon class="arrow"
        large>
        mdi-chevron-right
        </v-icon>
        </router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            model:"LDA",
            percentSelected:10,
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
</style>