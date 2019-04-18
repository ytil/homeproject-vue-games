<template>
  <div>
    <table>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <app-balda-table-cell v-for="(cell, cellIndex) in row" :key="cellIndex">
          {{ cell | uppercase }}
        </app-balda-table-cell>
      </tr>
    </table>

    <v-btn @click="changeWord">Другое слово</v-btn>
  </div>
</template>

<script>
import BaldaTableCell from "../components/BaldaTableCell";

function randomInteger(min, max) {
  let randomNum = min + Math.random() * (max + 1 - min);
  randomNum = Math.floor(randomNum);
  return randomNum;
}

export default {
  name: "Balda",
  components: {
    "app-balda-table-cell": BaldaTableCell
  },
  data() {
    return {
      board: [
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null],
        [null, null, null, null, null]
      ],
      words: ["манка", "комок", "балда", "каток", "лимон"]
    };
  },
  mounted() {
    const word = this.getRandomWord();
    this.fillMainLine(word);
  },
  methods: {
    fillMainLine(word) {
      const split = word.split("");
      this.board.splice(2, 1, split);
    },
    getRandomWord() {
      const randomIndex = randomInteger(0, this.words.length - 1);
      const word = this.words[randomIndex];
      this.removeItemFromCollection(randomIndex);

      return word;
    },
    changeWord() {
      if (this.words.length > 0) {
        const word = this.getRandomWord();
        this.fillMainLine(word);
      }
    },
    removeItemFromCollection(index) {
      this.words.splice(index, 1);
    }
  },
  filters: {
    uppercase(value) {
      if (value !== null) {
        return value.toUpperCase();
      }
    }
  }
};
</script>

<style lang="scss" scoped>

table {
  border-collapse: separate;
}

</style>
