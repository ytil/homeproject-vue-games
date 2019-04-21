<template>
  <modal name="game-results" width="300" height="auto">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Игра окончена
      </v-card-title>

      <v-card-text>
        <template v-if="gameWinner === 'draw'">
          <v-layout mb-3 justify-center>
            <h1 class="text-xs-center">Победила дружба</h1>
          </v-layout>

          <img src="../../assets/handshake.png" alt="Рукопожатие" />
        </template>

        <template v-else>
          <v-layout mb-3 justify-center>
            <h1 class="text-xs-center">Победил игрок {{ currentPlayer }}</h1>
          </v-layout>
          <img src="../../assets/congrats.gif" alt="Радость победы" />
        </template>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" flat @click="restart">
          Еше разок
        </v-btn>
        <v-btn color="red" flat @click="cancel">
          Отмена
        </v-btn>
      </v-card-actions>
    </v-card>
  </modal>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  name: 'ModalGameResults',
  computed: {
    ...mapState('tictactoe', ['gameWinner']),
    ...mapGetters('tictactoe', ['currentPlayer']),
  },

  methods: {
    ...mapActions('tictactoe', ['NEW_GAME']),
    restart() {
      this.NEW_GAME()
      this.$modal.hide('game-results')
    },
    cancel() {
      this.$modal.hide('game-results')
    },
  },
}
</script>

<style scoped>
img {
  max-width: 100%;
}
</style>
