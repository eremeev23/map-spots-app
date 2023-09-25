import Vue from 'vue'
import Vuex from 'vuex'
import { markersStore } from './modules/markersStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loading: false
  },
  modules: {
    markersStore
  }
})
