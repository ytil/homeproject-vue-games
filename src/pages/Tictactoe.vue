<template>
  <v-container>
    <v-layout justify-center>
      <h1>Крестики-нолики</h1>
    </v-layout>

    <v-divider></v-divider>

    <v-layout>
      <p class="text-xs-center">Выберите параметры для игры. Высоту и ширину игрового поля, а так же кол-во совпадений подряд для выигрыша</p>
    </v-layout>

    <v-layout mt-5 mb-3>
      <app-game-settings></app-game-settings>
    </v-layout>

    <v-layout justify-center mb-5>
      <v-btn
        @click.native="INIT_NEW_GAME"
        to="/tictactoe/board"
        dark
        large
        color="indigo"
      >
        Играть
      </v-btn>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
import GameSettings from '../components/Tictactoe/GameSettings'

export default {
  name: 'Home',
  components: {
    'app-game-settings': GameSettings,
  },
  methods: {
    ...mapActions('tictactoe', ['INIT_NEW_GAME']),
  },
}
</script>
