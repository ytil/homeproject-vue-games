<template>
  <v-container>
    <div class="table">
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
import { mapState } from 'vuex'
import GameTableCell from './GameTableCell'

export default {
  computed: {
    ...mapState('tictactoe', ['matrix']),
  },
  components: {
    'app-cell': GameTableCell,
  },
}
</script>

<style scoped>
.table {
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: center;
}
</style>
