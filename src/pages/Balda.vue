<template>
  <v-container>
    <h1>Сыграй в балду</h1>

    <p>правила:</p>

    <table>
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <app-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :letter="cell"
        ></app-cell>
      </tr>
    </table>

    <v-btn @click="CHANGE_WORD">Другое слово</v-btn>

    <v-btn color="success">Сделать ход</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import GameTableCell from "../components/Balda/GameTableCell";

export default {
  name: "Balda",
  components: {
    "app-cell": GameTableCell
  },

  computed: {
    ...mapState("balda", ["board"])
  },

  mounted() {
    this.CHANGE_WORD()
  },

  methods: {
    ...mapActions('balda', ['CHANGE_WORD']),
  }
};
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
}
</style>
