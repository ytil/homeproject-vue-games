<template>
  <v-container>
    <div class="table">
      <div class="row" v-for="(row, rowIndex) in matrix" :key="rowIndex">
        <app-table-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :cellContent="cell"
        ></app-table-cell>
      </div>
    </div>
  </v-container>
</template>

<script>
import TableCell from "./TableCell";

export default {
  computed: {
    matrix() {
      return this.$store.state.matrix;
    }
  },
  components: {
    "app-table-cell": TableCell
  }
};
</script>

<style>
.table {
  margin: 0 auto;
}

.row {
  display: flex;
  justify-content: center;
}
</style>
