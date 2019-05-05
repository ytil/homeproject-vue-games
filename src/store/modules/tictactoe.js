export default {
  namespaced: true,

  state: {
    width: 3,
    height: 3,
    winningLine: 3,
    nextMoveX: true,
    matrix: [],
    emptyCells: 0,
    gameWinner: null,
  },

  getters: {
    currentPlayer(state) {
      return state.nextMoveX ? 'X' : 'O'
    },

    gameOver(state) {
      return state.gameWinner !== null
    },
  },

  mutations: {
    UPDATE_WIDTH_VALUE(state, width) {
      state.width = width
    },

    UPDATE_HEIGHT_VALUE(state, height) {
      state.height = height
    },

    UPDATE_WINNING_LINE_VALUE(state, line) {
      state.winningLine = line
    },

    RESET_ACTIVE_PLAYER(state) {
      state.nextMoveX = true
    },

    RESET_EMPTY_CELLS(state) {
      state.emptyCells = state.width * state.height
    },

    RESET_GAME_WINNER(state) {
      state.gameWinner = null
    },

    SET_MATRIX(state, matrix) {
      state.matrix = matrix
    },

    CHANGE_MATRIX_CELL(state, payload) {
      const { x, y, player } = payload
      state.matrix[y].splice(x, 1, player)
    },

    DECREASE_EMPTY_CELLS(state) {
      state.emptyCells = state.emptyCells - 1
    },

    SET_WINNER(state, winner) {
      state.gameWinner = winner
    },

    CHANGE_PLAYER(state) {
      state.nextMoveX = !state.nextMoveX
    },
  },

  actions: {
    INIT_NEW_GAME({ state, commit, dispatch }) {
      const { width, height } = state

      const matrix = Array(height)
        .fill('')
        .map(() => Array(width).fill(''))

      dispatch('RESET_TO_INITIAL')
      commit('SET_MATRIX', matrix)
    },

    RESET_TO_INITIAL({ commit }) {
      commit('RESET_ACTIVE_PLAYER')
      commit('RESET_EMPTY_CELLS')
      commit('RESET_GAME_WINNER')
    },
  },
}
