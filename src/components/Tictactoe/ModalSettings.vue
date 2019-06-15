<template>
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
      <v-btn @click="$emit('apply')" flat color="indigo">
        Применить
      </v-btn>

      <v-btn @click="$emit('cancel')" flat color="error">
        Отмена
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import GameSettings from './GameSettings'

export default {
  name: 'ModalGameSettings',
  components: {
    'app-game-settings': GameSettings,
  },
}
</script>
