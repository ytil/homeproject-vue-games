export default {
  namespaced: true,

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
    UPDATE_WIDTH(state, width) {
      state.width = width;
    },

    UPDATE_HEIGHT(state, height) {
      state.height = height;
    },

    UPDATE_WINNING_LINE(state, line) {
      state.winningLine = line;
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
    NEW_GAME({state, commit}) {
      const { width, height } = state;

      const matrix = Array(height)
        .fill(null)
        .map(() => Array(width).fill(null));

      commit("RESET_TO_GAME_START_VALUES");
      commit("SET_MATRIX", matrix);
    }
  }
};
