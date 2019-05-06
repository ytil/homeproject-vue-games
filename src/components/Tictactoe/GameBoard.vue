<template>
  <v-layout justify-center>
    <v-flex shrink>
      <div :class="{ 'game-over': gameOver }">
        <div class="row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
          <app-cell
            v-for="(cell, cellIndex) in row"
            :key="cellIndex"
            :class="calcCellClassName(cell)"
            @click="onCellClick(cellIndex, rowIndex)"
          >
            {{ cell }}
          </app-cell>
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import GameBoardCell from './GameBoardCell'
import TictactoeWinChecker from '../../utils/TictactoeWinChecker'

export default {
  computed: {
    ...mapState('tictactoe', ['matrix', 'winningLine', 'emptyCells']),
    ...mapGetters('tictactoe', ['currentPlayer', 'gameOver']),
  },
  components: {
    'app-cell': GameBoardCell,
  },
  methods: {
    ...mapMutations('tictactoe', [
      'CHANGE_MATRIX_CELL',
      'DECREASE_EMPTY_CELLS',
      'SET_WINNER',
      'SET_DRAW',
      'CHANGE_PLAYER',
    ]),

    calcCellClassName(cellContent) {
      if (cellContent === 'X') {
        return 'cell-cellIndex'
      } else if (cellContent === 'O') {
        return 'cell-o'
      } else return ''
    },

    onCellClick(cellIndex, rowIndex) {
      //break if game is over or clicked cell is not empty
      if (this.gameOver || this.matrix[rowIndex][cellIndex] !== '') {
        return
      }

      this.APPLY_MOVE({
        cellIndex, rowIndex, player: this.currentPlayer
      })

      const isWinning = new TictactoeWinChecker(
        cellIndex,
        rowIndex,
        this.currentPlayer,
        this.matrix,
        this.winningLine,
      ).calc()

      if (isWinning) {
        this.SET_WINNER(this.currentPlayer)
      } else if (this.emptyCells === 0) {
        // draw
        this.SET_WINNER('none')
      } else {
        this.CHANGE_PLAYER()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.game-over {
  .cell:after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background-color: lightgrey;
    z-index: -1;
  }

  .cell:not(.clicked) {
    position: relative;
    opacity: 0.7;
    cursor: not-allowed;
  }
}

.row {
  display: flex;
  justify-content: center;
}
</style>
