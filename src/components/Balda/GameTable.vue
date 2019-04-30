<template>
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
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import BaldaBoardCell from '../utils/BaldaBoardCell'
import GameTableCell from '../components/Balda/GameTableCell'

export default {
  name: 'GameTable',
  components: {
    'app-cell': GameTableCell,
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
  },

  methods: {
    isTargetCell(cellIndex, rowIndex) {
      return this.targetCell.x === cellIndex && this.targetCell.y === rowIndex
    },

    isSelectedCell(cellIndex, rowIndex) {
      return this.selectedCells.includes(`${rowIndex}${cellIndex}`)
    },

    isAvailableCell(cellIndex, rowIndex) {
      return this.availableCells.includes(`${rowIndex}${cellIndex}`)
    },
  },
}
</script>

<style scoped></style>
