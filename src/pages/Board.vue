<template>
  <div class="wrapper">
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
      <v-layout justify-center wrap>
        <v-btn @click="INIT_NEW_GAME">Сбросить ходы</v-btn>
        <v-btn @click="showSettings">Изменить настройки</v-btn>
      </v-layout>

      <v-layout justify-center mt-3 mb-3 text-xs-center>
        <h1 v-if="gameOver">
          Игра окончена <br />
          Победил игрок {{ currentPlayer }}
        </h1>
        <h1 v-else>Ходит игрок {{ currentPlayer }}</h1>
      </v-layout>

      <v-layout>
        <app-game-table></app-game-table>
      </v-layout>
    </v-container>

    <app-modal-results></app-modal-results>
    <app-modal-settings></app-modal-settings>
  </div>
</template>

<script>
import GameTable from '../components/Tictactoe/GameBoard'
import ModalResults from '../components/Tictactoe/ModalResults'
import ModalSettings from '../components/Tictactoe/ModalSettings'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Board',
  components: {
    'app-modal-settings': ModalSettings,
    'app-modal-results': ModalResults,
    'app-game-table': GameTable,
  },

  computed: {
    ...mapGetters('tictactoe', ['currentPlayer', 'gameOver']),
  },

  methods: {
    ...mapActions('tictactoe', ['INIT_NEW_GAME']),

    showSettings() {
      this.$modal.show('tictactoe-game-settings')
    },
  },

  watch: {
    gameOver(value) {
      if (value === true) {
        this.$modal.show('tictactoe-game-results')
      }
    },
  },
}
</script>

<style>
.wrapper {
  height: 100%;
  background-image: url('data:image/svg+xml,%3Csvg width="64" height="64" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"%3E%3Cpath d="M8 16c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zm33.414-6l5.95-5.95L45.95.636 40 6.586 34.05.636 32.636 2.05 38.586 8l-5.95 5.95 1.414 1.414L40 9.414l5.95 5.95 1.414-1.414L41.414 8zM40 48c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm0-2c3.314 0 6-2.686 6-6s-2.686-6-6-6-6 2.686-6 6 2.686 6 6 6zM9.414 40l5.95-5.95-1.414-1.414L8 38.586l-5.95-5.95L.636 34.05 6.586 40l-5.95 5.95 1.414 1.414L8 41.414l5.95 5.95 1.414-1.414L9.414 40z" fill="%239C92AC" fill-opacity="0.4" fill-rule="evenodd"/%3E%3C/svg%3E');
  background-repeat: repeat;
  background-size: 7em;
}

</style>
