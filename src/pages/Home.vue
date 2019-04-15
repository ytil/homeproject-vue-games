<template>
  <v-container>
    <v-layout justify-center>
      <h1>Крестики-нолики</h1>
    </v-layout>

    <v-divider></v-divider>

    <v-layout justify-center mt-5>
      <b>Использованы следующие технологии и библиотеки:</b>
    </v-layout>

    <v-layout justify-center mb-3>
      <v-chip>Vue</v-chip>
      <v-chip>Vuex</v-chip>
      <v-chip>Vue-router</v-chip>
      <v-chip>Vuetify</v-chip>
    </v-layout>

    <v-layout justify-center mb-5>
      <p class="text-xs-center">
        Исходный код алгоритма проверки выигрыша:
        <code>'src/utils/WinChecker.js'</code>
      </p>
    </v-layout>

    <v-layout mb-3>
      <v-flex>
        <app-game-settings></app-game-settings>
      </v-flex>
    </v-layout>

    <v-layout justify-center mb-5>
      <v-btn @click.native="newGame" to="/board" large color="primary"
        >Играть</v-btn
      >
    </v-layout>
  </v-container>
</template>

<script>
import GameSettings from "../components/GameSettings";

export default {
  name: "Home",
  components: {
    "app-game-settings": GameSettings
  },
  methods: {
    newGame() {
      this.$store.dispatch("newGame");
    }
  }
};
</script>
