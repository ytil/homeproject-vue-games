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

      return this.cellContent === "X" ? "cell-x" : "cell-o";
    }
  },
  methods: {
    onCellClick() {
      //break if game is over or clicked cell is not empty
      if (this.gameOver || this.matrix[this.y][this.x] !== null) {
        return;
      }

      this.$store.commit("changeMatrixCell", {
        x: this.x,
        y: this.y,
        player: this.currentPlayer
      });

      this.$store.commit("decreaseEmptyCells");

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
        this.$store.commit("setWinner", this.currentPlayer);
      } else if (this.emptyCells === 0) {
        this.$store.commit("setDraw");
      } else {
        this.$store.commit("changePlayer");
      }
    }
  }
};
</script>

<style lang="scss">
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

  &:hover {
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
  background: #3f51b5;

  &:hover {
    background-color: #3f51b5 !important;
  }
}

.cell-o {
  background: #ff9800;

  &:hover {
    background-color: #ff9800 !important;
  }
}
</style>
