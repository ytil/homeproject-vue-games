<template>
  <v-container>
    <v-layout column align-center>
      <v-flex>
        <h1>Крестики-нолики</h1>
      </v-flex>

      <v-flex>
        <a
          href="https://ru.wikipedia.org/wiki/%D0%9A%D1%80%D0%B5%D1%81%D1%82%D0%B8%D0%BA%D0%B8-%D0%BD%D0%BE%D0%BB%D0%B8%D0%BA%D0%B8"
          title="wikipedia"
          class="subheading"
        >
          Правила
        </a>
        <v-icon size="small">fas fa-link</v-icon>
      </v-flex>

    </v-layout>

    <v-divider></v-divider>

    <v-layout mt-3 justify-center>
      <p class="subheading text-xs-center">
        Выберите параметры для игры. Высоту и ширину игрового поля, а так же
        кол-во совпадений подряд для выигрыша
      </p>
    </v-layout>

    <v-layout my-3 justify-center>
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
