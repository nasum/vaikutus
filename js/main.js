import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import ElementUI from 'element-ui'
import DefaultLayout from './layouts/default'

import Home from './pages/Home'

import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en'

import VueMarkdown from 'vue-markdown'

import home from './store/home/index'

Vue.use(ElementUI, { locale })
Vue.use(VueRouter)
Vue.use(Vuex)

Vue.component('vue-markdown', VueMarkdown)

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: ':id',
          component: Home
        }
      ]
    }
  ]
})

const store = new Vuex.Store({
  modules: {
    home,
  }
})

new Vue({
  router,
  store
}).$mount('#app')