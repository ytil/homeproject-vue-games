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
      <v-layout justify-center wrap>
        <v-btn @click="NEW_GAME">Сбросить ходы</v-btn>
        <v-btn @click="showSettings">Изменить настройки</v-btn>
      </v-layout>

      <v-layout justify-center mt-5 mb-3>
        <h1>Ходит игрок {{ currentPlayer }}</h1>
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
import GameTable from '../components/Tictactoe/GameTable'
import ModalResults from '../components/Tictactoe/ModalResults'
import ModalSettings from '../components/Tictactoe/ModalSettings'
import { mapState, mapGetters, mapActions } from 'vuex'

export default {
  name: 'Board',
  components: {
    'app-modal-settings': ModalSettings,
    'app-modal-results': ModalResults,
    'app-game-table': GameTable,
  },

  computed: {
    ...mapState('tictactoe', ['gameOver']),
    ...mapGetters('tictactoe', ['currentPlayer']),
  },

  methods: {
    ...mapActions('tictactoe', ['NEW_GAME']),

    showSettings() {
      this.$modal.show('game-settings')
    },
  },

  watch: {
    gameOver(value) {
      if (value === true) {
        this.$modal.show('game-results')
      }
    },
  },
}
</script>
