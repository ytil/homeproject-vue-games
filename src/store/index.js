import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import tictactoe from './modules/tictactoe'
import balda from './modules/balda'

export default new Vuex.Store({
  strict: true,
  modules: {
    tictactoe,
    balda
  }
});
