<template>
  <v-container>
    <h1>Сыграй в балду</h1>

    <p>правила:</p>

    <app-game-scores></app-game-scores>

    <table>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <app-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :letter="cell"
          :available="isAvailableCell(cellIndex, rowIndex)"
          :target="isTargetCell(cellIndex, rowIndex)"
          :selected="isSelectedCell(cellIndex, rowIndex)"
          @click="selectCell(cellIndex, rowIndex)"
        ></app-cell>
      </tr>
    </table>

    <v-btn @click="changeWord">Другое слово</v-btn>
    <v-btn color="success" @click="makeMove">Сделать ход</v-btn>
    <v-btn color="error" v-if="isReadyToSelect" @click="resetMove">
      Сбросить ход
    </v-btn>

    <v-layout>
      <h1 v-if="selectedCells.length > 0">
        Текущее слово {{ selectedWord.toUpperCase() }}
      </h1>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import GameTableCell from '../components/Balda/GameTableCell'
import GameScores from '../components/Balda/GameScores'
import { randomInteger } from '../utils/randomInteger'
import { fiveLetterWords } from '../utils/fiveLetterRussianWords'
import BaldaBoardCell from '../utils/BaldaBoardCell'
import dictionary from '../utils/russian_nouns_with_definition'

export default {
  name: 'Balda',
  components: {
    'app-cell': GameTableCell,
    'app-game-scores': GameScores
  },

  data() {
    return {
      dragStart: false,
      selectedCells: [], // format like ['00', '45', '33'] first letter is rowIndex, second is cellIndex
      isWordContainsTargetLetter: false,
    }
  },

  computed: {
    ...mapState('balda', ['board', 'targetCell']),
    ...mapGetters('balda', ['mainLineWord', 'gameOver']),

    // the cells is available to select target letter
    // breadth-first search algorithm
    availableCells() {
      const SEARCH_START_POSITION = { x: 2, y: 2 }
      let queue = [SEARCH_START_POSITION]
      const checkedCells = {}
      const availableCells = []

      while (queue.length > 0) {
        const cell = queue.shift()
        const neighbours = new BaldaBoardCell(cell.x, cell.y).getAllNeighbours()

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
      return this.targetCell.letter !== null
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
    const word = this.getRandomWord()
    this.INIT_GAME(word)
  },

  methods: {
    ...mapMutations('balda', ['RESET_TARGET_CELL']),
    ...mapActions('balda', ['INIT_GAME', 'APPLY_MOVE']),

    getLastSelectedCell() {
      if (this.selectedCells.length === 0) return null
      const last = this.selectedCells[this.selectedCells.length - 1]
      const rowIndex = +last[0]
      const cellIndex = +last[1]

      return {
        cellIndex,
        rowIndex,
      }
    },

    isNeighbours(current, last) {
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
      return this.targetCell.x === cellIndex && this.targetCell.y === rowIndex
    },

    isSelectedCell(cellIndex, rowIndex) {
      return this.selectedCells.includes(`${rowIndex}${cellIndex}`)
    },

    isAvailableCell(cellIndex, rowIndex) {
      return this.availableCells.includes(`${rowIndex}${cellIndex}`)
    },

    selectCell(cellIndex, rowIndex) {
      if (
        this.isReadyToSelect === false ||
        this.selectedCells.includes(`${rowIndex}${cellIndex}`) === true
      ) {
        return
      }

      const lastSelectedCell = this.getLastSelectedCell()
      const currentCell = { cellIndex, rowIndex }

      if (
        lastSelectedCell === null ||
        this.isNeighbours(currentCell, lastSelectedCell) === true
      ) {
        if (this.isTargetCell(cellIndex, rowIndex)) {
          this.isWordContainsTargetLetter = true
        } else if (this.board[rowIndex][cellIndex] === '') {
          return
        }

        this.selectedCells.push(`${rowIndex}${cellIndex}`)
      }
    },

    getRandomWord() {
      const randomIndex = randomInteger(0, fiveLetterWords.length - 1)
      return fiveLetterWords[randomIndex]
    },

    changeWord() {
      const word = this.getRandomWord()
      this.resetMove()
      this.INIT_GAME(word)
    },

    makeMove() {
      if (this.selectedWord === '') return

      if (this.mainLineWord === this.selectedWord) {
        console.log('слово не может совпадать с изначальным словом')
        return
      }

      if (this.isWordContainsTargetLetter === false) {
        console.log('слово должно содержать выбранную вами букву')
        return
      }

      if (dictionary[this.selectedWord] === undefined) {
        console.log('в словаре нет такого слова')
        return
      }

      this.APPLY_MOVE(this.selectedWord)
      console.log('move appliyed')
      this.selectedCells = []
    },

    resetMove() {
      this.selectedCells = []
      this.isWordContainsTargetLetter = false
      this.RESET_TARGET_CELL()
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 2px;
}
</style>
