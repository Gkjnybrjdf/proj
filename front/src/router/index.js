import Vue from 'vue'
import VueRouter from 'vue-router'
import Info from '@/views/Info.vue'
import MainPage from '@/views/MainPage.vue'
Vue.use(VueRouter)


const router = new VueRouter({
  routes : [
    {path:'/', component: MainPage},
    { path: '/info/:id', component: Info }
  ]
})

export default router
