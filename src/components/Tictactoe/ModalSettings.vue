<template>
  <modal name="tictactoe-game-settings" height="auto" adaptive>
    <v-card>
      <v-card-title class="headline grey lighten-2" primary-title>
        Настройки
      </v-card-title>

      <v-card-text>
        <app-game-settings></app-game-settings>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="apply" flat color="indigo">
          Применить
        </v-btn>
      </v-card-actions>
    </v-card>
  </modal>
</template>

<script>
import { mapActions } from 'vuex'
import GameSettings from './GameSettings'

export default {
  name: 'ModalGameSettings',
  components: {
    'app-game-settings': GameSettings,
  },

  methods: {
    ...mapActions('tictactoe', ['INIT_NEW_GAME']),

    apply() {
      this.INIT_NEW_GAME()
      this.$modal.hide('tictactoe-game-settings')
    },
  },
}
</script>
