import Vue from "vue";
import Vuex from "vuex";
import rental from "./rental";
import auth from "./auth";
import household from "./household";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    rental,
    auth,
    household,
  },
});
