import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    width: 3,
    height: 3,
    winningLine: 3,
    nextMoveX: true,
    matrix: [],
    emptyCells: 0,
    gameOver: false,
    gameWinner: false
  },

  getters: {
    currentPlayer(state) {
      return state.nextMoveX ? "X" : "O";
    }
  },

  mutations: {
    updateWidth(state, payload) {
      state.width = payload
    },

    updateHeight(state, payload) {
      state.height = payload
    },

    updateWinningLine(state, payload) {
      state.winningLine = payload
    },

    resetToGameStartValues(state) {
      state.nextMoveX = true;
      state.emptyCells = state.width * state.height;
      state.gameOver = false;
      state.gameWinner = false;
    },

    setMatrix(state, matrix) {
      state.matrix = matrix;
    },

    changeMatrixCell(state, payload) {
      const { x, y, player } = payload;
      state.matrix[y].splice(x, 1, player);
    },

    decreaseEmptyCells(state) {
      state.emptyCells = state.emptyCells - 1;
    },

    setWinner(state, player) {
      state.gameOver = true;
      state.gameWinner = player;
    },

    setDraw(state) {
      state.gameOver = true;
      state.gameWinner = "draw";
    },

    changePlayer(state) {
      state.nextMoveX = !state.nextMoveX;
    }
  },

  actions: {
    newGame(context) {
      const { width, height } = context.state;

      const matrix = Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

      context.commit("resetToGameStartValues");
      context.commit("setMatrix", matrix);
    }
  }
});
