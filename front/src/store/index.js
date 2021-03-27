import Vue from 'vue'
import Vuex from 'vuex'
import summ from './summ'
Vue.use(Vuex)

export default  new Vuex.Store({
  modules: {
    summ
  }
})
