<template>
  <v-container>
    <h1>Сыграй в балду</h1>

    <p>правила:</p>

    <table>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <app-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :letter="cell"
          :selected="selectedCells.includes(`${rowIndex}${cellIndex}`)"
          @click.native="selectCell(cellIndex, rowIndex)"
        ></app-cell>
      </tr>
    </table>

    <v-btn @click="CHANGE_WORD">Другое слово</v-btn>
    <v-btn color="success">Сделать ход</v-btn>

    <h1>Текущее слово {{ selectedWord }}</h1>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GameTableCell from '../components/Balda/GameTableCell'

export default {
  name: 'Balda',
  components: {
    'app-cell': GameTableCell,
  },

  data() {
    return {
      dragStart: false,
      selectedCells: [], // format like ['00', '45', '33'] first letter is rowIndex, second is cellIndex
    }
  },

  computed: {
    ...mapState('balda', ['board', 'targetCell']),

    selectedWord() {
      const letters = this.selectedCells.map(cell => {
        const x = cell[1]
        const y = cell[0]

        return this.board[y][x]
      })

      return letters.join('')
    },
  },

  mounted() {
    this.CHANGE_WORD()
  },

  methods: {
    ...mapActions('balda', ['CHANGE_WORD']),

    selectCell(cellIndex, rowIndex) {
      console.log('1')
      if (!this.isAllowedToSelect(cellIndex, rowIndex)) return

      console.log('select cell')

      const last = this.getLastSelectedCell()
      const current = { cellIndex, rowIndex }

      if (this.isNeighbours(last, current)) {
        console.log('select cell2')
        this.selectedCells.push(`${rowIndex}${cellIndex}`)
      }
    },

    isAllowedToSelect(cellIndex, rowIndex) {
      if (this.board[rowIndex][cellIndex] === '') {
        return false
      }

      return true
    },

    getLastSelectedCell() {
      if (this.selectedCells.length === 0) {
        return false
      }
      const lastSelectedCell = this.selectedCells[this.selectedCells.length - 1]
      const cellIndex = lastSelectedCell[1]
      const rowIndex = lastSelectedCell[0]

      return {
        cellIndex,
        rowIndex,
      }
    },

    isNeighbours(firstCell, secondCell) {
      //checks if the cells are neighbors of horizontal or vertical

      if (firstCell.cellIndex === secondCell.cellIndex) {
        return Math.abs(firstCell.rowIndex - secondCell.rowIndex) === 1
      } else if (firstCell.rowIndex === secondCell.rowIndex) {
        return firstCell.cellIndex === secondCell.cellIndex
      } else {
        return false
      }
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 10px;
}
</style>
