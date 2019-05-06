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
    score: {
      usedWords: [],
      player1: {
        total: 0,
        words: [],
      },
      player2: {
        total: 0,
        words: [],
      },
    },
    nextMovePlayer1: true,
    emptyCells: 20,
    targetCell: {
      x: null,
      y: null,
      letter: null,
    },
    gameWinner: null,
  },

  getters: {
    currentPlayer(state) {
      return state.nextMovePlayer1 ? 'player1' : 'player2'
    },

    mainLineWord(state) {
      const mainLine = state.board[2].slice()
      return mainLine.join('')
    },

    gameOver(state) {
      return state.emptyCells === 0
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

    UPDATE_SCORE(state, payload) {
      const { word, player } = payload
      const wordLength = word.length

      state.score[player].words.push(word)
      state.score[player].total += wordLength
      state.score.usedWords.push(word)
    },

    RESET_SCORE(state) {
      state.score = {
        usedWords: [],
        player1: {
          total: 0,
          words: [],
        },
        player2: {
          total: 0,
          words: [],
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

    SET_GAME_WINNER(state, winner) {
      state.gameWinner = winner
    },

    RESET_GAME_WINNER(state) {
      state.gameWinner = null
    },
  },

  actions: {
    INIT_NEW_GAME({ commit, dispatch }, word) {
      dispatch('RESET_TO_INITIAL')
      commit('FILL_MAIN_LINE', word)
    },

    APPLY_MOVE({ state, getters, commit }, word) {
      const { x, y, letter } = state.targetCell
      const { currentPlayer } = getters

      commit('DECREASE_EMPTY_CELLS')
      commit('UPDATE_SCORE', { word, player: currentPlayer })
      commit('ADD_LETTER_TO_MATRIX', { x, y, letter })
      commit('RESET_TARGET_CELL')
      commit('CHANGE_ACTIVE_PLAYER')
    },

    RESET_TO_INITIAL({ commit }) {
      commit('RESET_GAME_BOARD')
      commit('RESET_TARGET_CELL')
      commit('RESET_EMPTY_CELLS')
      commit('RESET_SCORE')
      commit('RESET_GAME_WINNER')
      commit('CHANGE_ACTIVE_PLAYER', 'player1')
    },
  },
}
