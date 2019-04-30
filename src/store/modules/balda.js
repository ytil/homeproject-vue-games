export default {
  namespaced: true,

  state: {
    board: [
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
      ['', '', '', '', ''],
    ],

    scores: {
      player1: {
        total: 0,
        usedWords: [],
      },
      player2: {
        total: 0,
        usedWords: [],
      },
    },

    nextMovePlayer1: true,

    emptyCells: 20,

    targetCell: {
      x: null,
      y: null,
      letter: null,
    },
  },

  getters: {
    currentPlayer(state) {
      return state.nextMovePlayer1 ? 'player1' : 'player2'
    },

    gameOver(state) {
      return state.emptyCells === 0
    },

    mainLineWord(state) {
      const mainLine = state.board[2].slice()
      return mainLine.join('')
    },
  },

  mutations: {
    SET_TARGET_CELL(state, coords) {
      state.targetCell = coords
    },

    RESET_TARGET_CELL(state) {
      state.targetCell = {
        x: null,
        y: null,
        letter: null,
      }
    },

    ADD_LETTER_TO_MATRIX(state, payload) {
      const { x, y, letter } = payload
      state.board[y].splice(x, 1, letter)
    },

    CHANGE_ACTIVE_PLAYER(state, player) {
      if (player === undefined) {
        state.nextMovePlayer1 = !state.nextMovePlayer1
      } else if (player === 'player1') {
        state.nextMovePlayer1 = true
      } else if (player === 'player2') {
        state.nextMovePlayer1 = false
      }
    },

    DECREASE_EMPTY_CELLS(state) {
      state.emptyCells = state.emptyCells - 1
    },

    RESET_EMPTY_CELLS(state) {
      state.emptyCells = 20
    },

    FILL_MAIN_LINE(state, word) {
      const splitWord = word.split('')
      state.board.splice(2, 1, splitWord)
    },

    SET_SCORES(state, payload) {
      const { word, player } = payload
      const wordLength = word.length

      state.scores[player].usedWords.push(word)
      state.scores[player].total += wordLength
    },

    RESET_SCORES(state) {
      state.scores = {
        player1: {
          total: 0,
          usedWords: [],
        },
        player2: {
          total: 0,
          usedWords: [],
        },
      }
    },

    RESET_GAME_BOARD(state) {
      state.board = [
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '', ''],
      ]
    },
  },

  actions: {
    INIT_GAME({ commit, dispatch }, word) {
      dispatch('RESET_TO_INITIAL')
      commit('FILL_MAIN_LINE', word)
    },

    APPLY_MOVE({ state, getters, commit }, word) {
      const { x, y, letter } = state.targetCell
      const { currentPlayer } = getters

      commit('SET_SCORES', { word: word, player: currentPlayer })
      commit('ADD_LETTER_TO_MATRIX', { x, y, letter })
      commit('RESET_TARGET_CELL')
      commit('CHANGE_ACTIVE_PLAYER')
    },

    RESET_TO_INITIAL({ commit }) {
      commit('RESET_GAME_BOARD')
      commit('RESET_TARGET_CELL')
      commit('RESET_EMPTY_CELLS')
      commit('RESET_SCORES')
      commit('CHANGE_ACTIVE_PLAYER', 'player1')
    },
  },
}
