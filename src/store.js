import Vue from 'vue'
import Vuex from 'vuex'
import cart from './store/cart'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    cart
  }
})
