<template>
  <modal name="game-settings" width="400" height="auto">
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
        <v-btn @click="apply" flat color="primary">
          Применить
        </v-btn>
      </v-card-actions>
    </v-card>
  </modal>
</template>

<script>
import GameSettings from "../components/GameSettings";

export default {
  name: "ModalGameSettings",
  components: {
    "app-game-settings": GameSettings
  },
  methods: {
    apply() {
      this.$store.dispatch('newGame')
      this.$modal.hide('game-settings')
    }
  },
};
</script>
