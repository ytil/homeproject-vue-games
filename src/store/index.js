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
    UPDATE_WIDTH(state, payload) {
      state.width = payload;
    },

    UPDATE_HEIGHT(state, payload) {
      state.height = payload;
    },

    UPDATE_WINNING_LINE(state, payload) {
      state.winningLine = payload;
    },

    RESET_TO_GAME_START_VALUES(state) {
      state.nextMoveX = true;
      state.emptyCells = state.width * state.height;
      state.gameOver = false;
      state.gameWinner = false;
    },

    SET_MATRIX(state, matrix) {
      state.matrix = matrix;
    },

    CHANGE_MATRIX_CELL(state, payload) {
      const { x, y, player } = payload;
      state.matrix[y].splice(x, 1, player);
    },

    DECREASE_EMPTY_CELLS(state) {
      state.emptyCells = state.emptyCells - 1;
    },

    SET_WINNER(state, player) {
      state.gameOver = true;
      state.gameWinner = player;
    },

    SET_DRAW(state) {
      state.gameOver = true;
      state.gameWinner = "draw";
    },

    CHANGE_PLAYER(state) {
      state.nextMoveX = !state.nextMoveX;
    }
  },

  actions: {
    NEW_GAME(context) {
      const { width, height } = context.state;

      const matrix = Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

      context.commit("RESET_TO_GAME_START_VALUES");
      context.commit("SET_MATRIX", matrix);
    }
  }
});
