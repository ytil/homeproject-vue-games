<template>
  <div class="cell" :class="clickedCellClassName" @click="onCellClick">
    {{ cellContent }}
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
import TictactoeWinChecker from "../../utils/TictactoeWinChecker";

export default {
  name: "VTableCell",
  props: {
    x: Number,
    y: Number,
    cellContent: String
  },

  computed: {
    ...mapState("tictactoe", [
      "matrix",
      "winningLine",
      "emptyCells",
      "gameOver"
    ]),
    ...mapGetters("tictactoe", ["currentPlayer"]),

    clickedCellClassName() {
      if (this.cellContent === null) {
        return "";
      }

      return this.cellContent === "X" ? "clicked cell-x" : "clicked cell-o";
    }
  },

  methods: {
    ...mapMutations("tictactoe", [
      "CHANGE_MATRIX_CELL",
      "DECREASE_EMPTY_CELLS",
      "SET_WINNER",
      "SET_DRAW",
      "CHANGE_PLAYER"
    ]),

    onCellClick() {
      //break if game is over or clicked cell is not empty
      if (this.gameOver || this.matrix[this.y][this.x] !== null) {
        return;
      }

      this.CHANGE_MATRIX_CELL({
        x: this.x,
        y: this.y,
        player: this.currentPlayer
      });

      this.DECREASE_EMPTY_CELLS();

      this.checkWin();
    },

    checkWin() {
      const win = new TictactoeWinChecker(
        this.x,
        this.y,
        this.currentPlayer,
        this.matrix,
        this.winningLine
      ).calc();

      if (win) {
        this.SET_WINNER(this.currentPlayer);
      } else if (this.emptyCells === 0) {
        this.SET_DRAW();
      } else {
        this.CHANGE_PLAYER();
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
