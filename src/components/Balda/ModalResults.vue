<template>
  <v-card>
    <v-card-title class="headline grey lighten-2" primary-title>
      Игра окончена
    </v-card-title>

    <v-card-text>
      <template v-if="gameWinner === 'none'">
        <v-layout mb-3 column align-center>
          <h1>Победила дружба</h1>
          <img src="../../assets/handshake.png" alt="Рукопожатие" />
        </v-layout>
      </template>

      <template v-else>
        <v-layout mb-3 column align-center>
          <h1>Победил {{ gameWinner }}</h1>
          <img src="../../assets/congrats.gif" alt="Радость победы" />
        </v-layout>
      </template>
    </v-card-text>

    <v-divider></v-divider>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="indigo" flat @click="$emit('restart')">
        Еше разок
      </v-btn>
      <v-btn color="red" flat @click="$emit('cancel')">
        Отмена
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'ModalResults',
  computed: {
    ...mapState('balda', ['gameWinner']),
  },
}
</script>

<style scoped>
img {
  max-width: 70%;
}
</style>
