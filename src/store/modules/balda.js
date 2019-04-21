import { randomInteger } from '../../utils/randomInteger'

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

    words: [
      'манка',
      'комок',
      'балда',
      'каток',
      'лимон',
      'чашка',
      'петух',
      'чайка',
    ],

    targetCell: {
      status: 'none',
      x: null,
      y: null,
      letter: null,
    },
  },

  getters: {
    randomWord(state) {
      const { words } = state
      const randomIndex = randomInteger(0, words.length - 1)
      const word = words[randomIndex]

      return {
        word,
        index: randomIndex,
      }
    },

    currentWord(state) {
      const mainLine = state.board[2].slice()
      const currentWord = mainLine.join('')

      return currentWord
    },
  },

  mutations: {
    SET_TARGET_CELL(state, payload) {
      state.targetCell = {
        status: 'selected',
        x: payload.x,
        y: payload.y,
        letter: payload.letter,
      }
    },

    FILL_MAIN_LINE(state, word) {
      const splitWord = word.split('')
      state.board.splice(2, 1, splitWord)
    },

    REMOVE_WORD_FROM_DICTIONARY(state, index) {
      state.words.splice(index, 1)
    },

    RESET_GAME_BOARD_TO_INITIAL_STATE(state) {
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
    CHANGE_WORD({ state, getters, commit }) {
      const { words } = state

      if (words.length > 0) {
        const { word, index } = getters.randomWord
        commit('REMOVE_WORD_FROM_DICTIONARY', index)
        commit('RESET_GAME_BOARD_TO_INITIAL_STATE')
        commit('FILL_MAIN_LINE', word)
      }
    },
  },
}
