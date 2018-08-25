import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import Home from './pages/Home'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)
Vue.use(Vuex)

new Vue({
  'el': '#app',
  'template': '<home/>',
  components: { Home }
})