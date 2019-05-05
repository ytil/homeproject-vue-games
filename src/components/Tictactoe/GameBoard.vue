<template>
  <v-container>
    <div class="table" :class="{ 'game-over': gameOver }">
      <div class="row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
        <app-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :cellContent="cell"
        ></app-cell>
      </div>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import GameTableCell from './GameBoardCell'

export default {
  computed: {
    ...mapGetters('tictactoe', ['gameOver']),
    ...mapState('tictactoe', ['matrix']),
  },
  components: {
    'app-cell': GameTableCell,
  },
}
</script>

<style lang="scss" scoped>
.table {
  margin: 0 auto;
  &.game-over {
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
}

.row {
  display: flex;
  justify-content: center;
}
</style>
