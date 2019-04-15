<template>
  <div>
    <v-toolbar auto-height>
      <v-toolbar-title>
        Крестики-нолики
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn flat to="/">На главную</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-container>
      <v-layout justify-center>
        <v-btn @click="newGame" small>Сбросить ходы</v-btn>
        <v-btn @click="showSettings" small>Изменить настройки</v-btn>
      </v-layout>

      <v-layout justify-center mt-5 mb-3>
        <h1>Ходит игрок {{ currentPlayer }}</h1>
      </v-layout>

      <v-layout>
        <app-table></app-table>
      </v-layout>
    </v-container>

    <app-modal-game-results></app-modal-game-results>
    <app-modal-game-settings></app-modal-game-settings>
  </div>
</template>

<script>
import Table from "../components/Table";
import ModalGameResults from "../components/ModalGameResults";
import ModalGameSettings from "../components/ModalGameSettings";

export default {
  name: "Board",
  components: {
    "app-modal-game-settings": ModalGameSettings,
    "app-modal-game-results": ModalGameResults,
    "app-table": Table
  },

  computed: {
    gameOver() {
      return this.$store.state.gameOver;
    },
    currentPlayer() {
      return this.$store.getters.currentPlayer;
    }
  },
  methods: {
    newGame() {
      this.$store.dispatch("newGame");
    },
    showSettings() {
      this.$modal.show("game-settings");
    }
  },
  watch: {
    gameOver(value) {
      if (value === true) {
        this.$modal.show("game-results");
      }
    }
  }
};
</script>
