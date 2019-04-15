<template>
  <div class="cell" :class="clickedCellClassName" @click="onCellClick">
    {{ cellContent }}
  </div>
</template>

<script>
  import {mapState, mapGetters} from "vuex";
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
          return ''
        }

        return this.cellContent === 'X' ? 'cell-x' : 'cell-o'
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

<style>
  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid lightslategray;
    cursor: pointer;
    font-size: 30px;
    color: lightgray;
  }

  .cell {
    width: 100%;
    max-width: 70px;
  }

  /*trick for dynamically matching height to width*/
  .cell:after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }

  .cell-x {
    background: #3f51b5;
  }

  .cell-o {
    background: #ff9800;
  }
</style>
