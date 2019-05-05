<template>
  <modal name="balda-game-results" width="300" height="auto">
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Игра окончена
      </v-card-title>

      <v-card-text>
        <template v-if="gameWinner === 'none'">
          <v-layout mb-3 justify-center>
            <h1 class="text-xs-center">Победила дружба</h1>
          </v-layout>

          <img src="../../assets/handshake.png" alt="Рукопожатие" />
        </template>

        <template v-else>
          <v-layout mb-3 justify-center>
            <h1 class="text-xs-center">Победил {{ gameWinner }}</h1>
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
import { mapState } from 'vuex'

export default {
  name: 'ModalResults',
  computed: {
    ...mapState('balda', ['gameWinner']),
  },
  methods: {
    restart() {
      this.$emit('restart')
      this.$modal.hide('balda-game-results')
    },
    cancel() {
      this.$modal.hide('balda-game-results')
    },
  },
}
</script>

<style scoped>
img {
  max-width: 100%;
}
</style>
