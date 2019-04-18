<template>
  <div class="cell" :class="clickedCellClassName" @click="onCellClick">
    {{ cellContent }}
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import WinChecker from "../utils/WinChecker";

export default {
  name: "VTableCell",
  props: {
    x: Number,
    y: Number,
    cellContent: String
  },
  computed: {
    ...mapState(["matrix", "winningLine", "emptyCells", "gameOver"]),
    ...mapGetters(["currentPlayer"]),

    clickedCellClassName() {
      if (this.cellContent === null) {
        return "";
      }

      return this.cellContent === "X" ? "clicked cell-x" : "clicked cell-o";
    }
  },
  methods: {
    onCellClick() {
      //break if game is over or clicked cell is not empty
      if (this.gameOver || this.matrix[this.y][this.x] !== null) {
        return;
      }

      this.$store.commit("CHANGE_MATRIX_CELL", {
        x: this.x,
        y: this.y,
        player: this.currentPlayer
      });

      this.$store.commit("DECREASE_EMPTY_CELLS");

      this.checkWin();
    },

    checkWin() {
      const win = new WinChecker(
        this.x,
        this.y,
        this.currentPlayer,
        this.matrix,
        this.winningLine
      ).calc();

      if (win) {
        this.$store.commit("SET_WINNER", this.currentPlayer);
      } else if (this.emptyCells === 0) {
        this.$store.commit("SET_DRAW");
      } else {
        this.$store.commit("CHANGE_PLAYER");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 70px;

  outline: 2px solid gray;
  cursor: pointer;
  font-size: 20px;
  background-color: white;
  color: lightgray;

  &:not(.clicked):hover {
    background-color: lightgray;
  }
}

/*trick for dynamically matching height to width*/
.cell:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}

.cell-x {
  background-color: #3f51b5;
}

.cell-o {
  background-color: #ff9800;
}
</style>
