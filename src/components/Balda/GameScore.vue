<template>
  <v-expansion-panel>
    <v-expansion-panel-content>
      <template v-slot:actions>
        <v-icon size="small">$vuetify.icons.expand</v-icon>
      </template>

      <template v-slot:header>
        <v-layout align-center justify-space-between>
          <v-flex xs6>
            <span class="subheading mx-2">
              Игрок 1
              <b class="mx-3 title">{{ score.player1.total }}</b>
            </span>
          </v-flex>

          <v-divider class="hidden-sm-and-down"></v-divider>

          <v-flex xs6>
            <span class="subheading mx-2">
              Игрок 2
              <b class="mx-3 title">{{ score.player2.total }}</b>
            </span>
          </v-flex>
        </v-layout>
      </template>

      <v-layout>
        <v-flex xs6>
          <v-list dense>
            <v-list-tile v-for="(word, idx) in score.player1.words" :key="idx">
              <v-list-tile-content>
                <span class="subheading">{{ word }}</span>
              </v-list-tile-content>

              <v-list-tile-content class="align-end">
                <span class="body-1">{{ word.length }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>

        <v-divider vertical></v-divider>

        <v-flex xs6>
          <v-list dense>
            <v-list-tile v-for="(word, idx) in score.player2.words" :key="idx">
              <v-list-tile-content>
                <span class="subheading">{{ word }}</span>
              </v-list-tile-content>

              <v-list-tile-content class="align-end">
                <span class="body-1">{{ word.length }}</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
    </v-expansion-panel-content>
  </v-expansion-panel>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'GameScore',
  computed: {
    ...mapState('balda', ['score']),
  },
}
</script>
