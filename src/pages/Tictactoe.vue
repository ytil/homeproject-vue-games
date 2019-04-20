<template>
  <v-container>
    <v-layout justify-center>
      <h1>Крестики-нолики</h1>
    </v-layout>

    <v-divider></v-divider>

    <v-layout justify-center mt-5>
      <b class="text-xs-center">Использованы следующие технологии и библиотеки:</b>
    </v-layout>

    <v-layout justify-center mb-3>
      <v-chip>Vue</v-chip>
      <v-chip>Vuex</v-chip>
      <v-chip>Vue-router</v-chip>
      <v-chip>Vuetify</v-chip>
    </v-layout>

    <v-layout justify-center mb-5>
      <p class="text-xs-center">
        Алгоритм проверки выигрыша:
        <code>'src/utils/TictactoeWinChecker.jshecker.js'</code>
      </p>
    </v-layout>

    <v-layout mb-3>
      <v-flex>
        <app-game-settings></app-game-settings>
      </v-flex>
    </v-layout>

    <v-layout justify-center mb-5>
      <v-btn @click.native="NEW_GAME" to="/board" dark large color="indigo"
        >Играть</v-btn
      >
    </v-layout>

    <v-layout>
      <v-btn to="/balda" large>to balda</v-btn>
    </v-layout>
  </v-container>
</template>

<script>
  import {mapActions} from 'vuex'
import GameSettings from "../components/Tictactoe/GameSettings";

export default {
  name: "Home",
  components: {
    "app-game-settings": GameSettings
  },
  methods: {
    ...mapActions('tictactoe', ['NEW_GAME'])
  }
};
</script>
