<template>
  <v-container>
    <v-layout justify-center mb-2>
      <b v-if="!gameOver" class="headline">
        Сейчас ходит {{ formattedPlayerName }}
      </b>
      <b v-else>
        Игра окончена
      </b>
    </v-layout>

    <v-layout wrap class="board-wrapper" mx-auto>
      <app-game-score></app-game-score>

      <table
        @mousedown="dragStart = true"
        @mouseup="dragStart = false"
        @touchmove.prevent="onTouchMove($event)"
      >
        <tr v-for="(row, rowIndex) in board" :key="rowIndex">
          <app-cell
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :cellIndex="cellIndex"
            :rowIndex="rowIndex"
            :letter="cell"
            :available="isAvailableCell(cellIndex, rowIndex)"
            :target="isTargetCell(cellIndex, rowIndex)"
            :selected="isSelectedCell(cellIndex, rowIndex)"
            @mousedown.prevent="selectCell(cellIndex, rowIndex)"
            @mouseenter="onDragSelect(cellIndex, rowIndex)"
            @touchstart="selectCell(cellIndex, rowIndex)"
          ></app-cell>
        </tr>
      </table>

      <v-layout>
        <p>
          <b class="subheading">Выбранное слово:</b>
          <b
            v-if="this.selectedCells.length > 0"
            class=" title ml-3 text-uppercase"
          >
            {{ this.selectedWord }}
          </b>
          <span v-else class="ml-3">Пока не выбрано</span>
        </p>
      </v-layout>

      <v-layout wrap justify-space-between>
        <v-flex xs12 sm3>
          <v-btn block @click="restartGame">Новая игра</v-btn>
        </v-flex>

        <v-flex xs12 sm4>
          <v-btn
            block
            color="error"
            :disabled="!isReadyToSelect"
            @click="resetMove"
          >
            Сбросить ход
          </v-btn>
        </v-flex>

        <v-flex xs12 sm4>
          <v-btn block color="success" :disabled="gameOver" @click="makeMove">
            Сделать ход
          </v-btn>
        </v-flex>
      </v-layout>
    </v-layout>

    <v-dialog v-model="showModalResults" width="400">
      <app-modal-results
        @restart="restartGame"
        @cancel="showModalResults = false"
      ></app-modal-results>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GameTableCell from '../components/Balda/GameBoardCell'
import ModalResults from '../components/Balda/ModalResults'
import GameScore from '../components/Balda/GameScore'
import throttle from 'lodash.throttle'
import randomInteger from '../utils/randomInteger'
import { fiveLetterWords } from '../utils/fiveLetterRussianWords'
import getCellNeighbours from '../utils/getCellNeighbours'
import dictionary from '../utils/russian_nouns_with_definition'

export default {
  name: 'Balda',
  components: {
    'app-cell': GameTableCell,
    'app-modal-results': ModalResults,
    'app-game-score': GameScore,
  },

  data() {
    return {
      dragStart: false,
      selectedCells: [],
      showModalResults: false,
    }
  },

  computed: {
    ...mapState('balda', ['board', 'targetCell', 'score']),
    ...mapGetters('balda', ['mainLineWord', 'gameOver', 'currentPlayer']),

    formattedPlayerName() {
      return this.currentPlayer === 'player1' ? 'Игрок 1' : 'Игрок 2'
    },

    // the cells is available to select target letter
    // breadth-first search algorithm
    availableCells() {
      const SEARCH_START_POSITION = { x: 2, y: 2 }
      let queue = [SEARCH_START_POSITION]
      const checkedCells = {}
      const availableCells = []

      while (queue.length > 0) {
        const cell = queue.shift()
        const neighbours = getCellNeighbours(cell.x, cell.y)

        neighbours.forEach(cell => {
          if (cell === null) return

          if (this.board[cell.y][cell.x] === '') {
            availableCells.push(`${cell.y}${cell.x}`)
          } else if (checkedCells[`${cell.y}${cell.x}`] === undefined) {
            queue.push(cell)
          }
        })

        checkedCells[`${cell.y}${cell.x}`] = true
      }

      return availableCells
    },

    isReadyToSelect() {
      return this.targetCell.letter !== null && !this.gameOver
    },

    isWordContainsTargetLetter() {
      const { cellIndex, rowIndex } = this.targetCell
      return this.selectedCells.includes(`${rowIndex}${cellIndex}`)
    },

    selectedWord() {
      const letters = this.selectedCells.map(cell => {
        const rowIndex = +cell[0]
        const cellIndex = +cell[1]

        if (this.isTargetCell(cellIndex, rowIndex)) {
          return this.targetCell.letter
        } else {
          return this.board[rowIndex][cellIndex]
        }
      })

      return letters.join('')
    },
  },

  mounted() {
    this.restartGame()
  },

  methods: {
    ...mapMutations('balda', ['RESET_TARGET_CELL', 'SET_GAME_WINNER']),
    ...mapActions('balda', ['INIT_NEW_GAME', 'APPLY_MOVE']),

    onTouchMove: throttle(function(event) {
      const { clientX: x, clientY: y } = event.changedTouches[0]
      const elem = document.elementFromPoint(x, y)
      if (!elem) return

      const td = elem.closest('td')
      if (td) {
        const cellIndex = td.cellIndex
        const rowIndex = td.parentNode.rowIndex

        this.selectCell(cellIndex, rowIndex)
      }
    }, 50),

    onDragSelect(cellIndex, rowIndex) {
      if (this.dragStart === true) {
        this.selectCell(cellIndex, rowIndex)
      }
    },

    getLastSelectedCell() {
      if (this.selectedCells.length === 0) return false
      const last = this.selectedCells[this.selectedCells.length - 1]
      const rowIndex = +last[0]
      const cellIndex = +last[1]

      return {
        cellIndex,
        rowIndex,
      }
    },

    isNeighbourCells(current, last) {
      //checks if the cells are neighbors of horizontal or vertical
      if (current.cellIndex === last.cellIndex) {
        return Math.abs(current.rowIndex - last.rowIndex) === 1
      } else if (current.rowIndex === last.rowIndex) {
        return Math.abs(current.cellIndex - last.cellIndex) === 1
      } else {
        return false
      }
    },

    isTargetCell(cellIndex, rowIndex) {
      return (
        this.targetCell.cellIndex === cellIndex &&
        this.targetCell.rowIndex === rowIndex
      )
    },

    isSelectedCell(cellIndex, rowIndex) {
      return this.selectedCells.includes(`${rowIndex}${cellIndex}`)
    },

    isAvailableCell(cellIndex, rowIndex) {
      return this.availableCells.includes(`${rowIndex}${cellIndex}`)
    },

    selectCell(cellIndex, rowIndex) {
      if (
        !this.isReadyToSelect ||
        this.selectedCells.includes(`${rowIndex}${cellIndex}`)
      ) {
        return
      }

      if (
        this.board[rowIndex][cellIndex] === '' &&
        !this.isTargetCell(cellIndex, rowIndex)
      ) {
        return
      }

      const lastSelectedCell = this.getLastSelectedCell()
      const currentCell = { cellIndex, rowIndex }

      if (
        !lastSelectedCell ||
        this.isNeighbourCells(currentCell, lastSelectedCell)
      ) {
        this.selectedCells.push(`${rowIndex}${cellIndex}`)
      }
    },

    getRandomWord() {
      const randomIndex = randomInteger(0, fiveLetterWords.length - 1)
      return fiveLetterWords[randomIndex]
    },

    makeMove() {
      this.clearNotifications()

      if (this.selectedWord === '') {
        this.$toasted.show('Сначала введите слово', { icon: 'warning' })
      } else if (this.selectedWord.length < 3) {
        this.$toasted.error('Минимальная необходимая длина слова - 3 буквы', {
          icon: 'error_outline',
        })
      } else if (!this.isWordContainsTargetLetter) {
        this.$toasted.error('Слово должно содержать выбранную вами букву', {
          icon: 'error_outline',
        })
        this.selectedCells = []
      } else if (this.score.usedWords.includes(this.selectedWord)) {
        const duplicatedWord = this.selectedWord
        this.resetMove()
        this.$toasted.error(
          `Слово ${duplicatedWord.toUpperCase()} уже учавствовало в игре, придумайте другое`,
          {
            icon: 'error_outline',
          },
        )
      } else if (this.mainLineWord === this.selectedWord) {
        const duplicatedWord = this.selectedWord
        this.resetMove()
        this.$toasted.error(`Слово ${duplicatedWord.toUpperCase()} не должно совпадать со стартовым словом`, {
          icon: 'error_outline'
        })
      } else if (dictionary[this.selectedWord] === undefined) {
        this.$toasted.show(
          `<span>В нашем словаре нет слова <b class="text-uppercase">${
            this.selectedWord
          }</b></span>`,
          {
            duration: 0,
            action: [
              {
                text: 'Добавить слово',
                onClick: (e, toastObject) => {
                  this.applyWord()
                  toastObject.goAway(0)
                },
              },
              {
                text: 'Ввести другое',
                onClick: (e, toastObject) => {
                  this.resetMove()
                  toastObject.goAway(0)
                },
              },
            ],
          },
        )
      } else {
        this.applyWord()
      }
    },

    clearNotifications() {
      this.$toasted.clear()
    },

    resetMove() {
      this.clearNotifications()
      this.selectedCells = []
      this.RESET_TARGET_CELL()
    },

    applyWord() {
      this.APPLY_MOVE(this.selectedWord)
      this.$toasted.success(`Добавлено: ${this.selectedWord.toUpperCase()}`, {
        icon: 'done',
      })
      this.selectedCells = []
    },

    restartGame() {
      this.showModalResults = false
      this.clearNotifications()
      const word = this.getRandomWord()
      this.resetMove()
      this.INIT_NEW_GAME(word)
    },

    calculateGameWinner() {
      if (!this.gameOver) return

      const player1Score = this.score.player1.total
      const player2Score = this.score.player2.total

      if (player1Score > player2Score) {
        return 'Игрок 1'
      } else if (player1Score < player2Score) {
        return 'Игрок 2'
      } else {
        return 'none'
      }
    },
  },

  watch: {
    gameOver(value) {
      if (value === true) {
        const gameWinner = this.calculateGameWinner()
        this.SET_GAME_WINNER(gameWinner)
        this.showModalResults = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.board-wrapper {
  box-sizing: border-box;
  width: 408px;

  table {
    border-collapse: separate;
    border-spacing: 2px;
    background-color: white;
  }

  @media (max-width: 600px) {
    width: 288px;
  }
}
</style>
