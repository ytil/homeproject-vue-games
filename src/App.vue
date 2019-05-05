<template>
  <div id="app">
    <v-app>
      <v-navigation-drawer v-model="drawer" app clipped touchless>
        <v-list>
          <v-list-tile to="/tictactoe">
            <v-list-tile-title>Крестики-нолики</v-list-tile-title>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile to="/balda">
            <v-list-tile-title>Балда</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-navigation-drawer>

      <v-toolbar color="indigo" dark app dense>
        <v-toolbar-side-icon
          @click.stop="drawer = !drawer"
        ></v-toolbar-side-icon>
        <v-toolbar-title>{{ toolbarTitle }}</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-toolbar-items>
          <v-btn v-if="isShowHomeLink" flat to="/">На главную</v-btn>
        </v-toolbar-items>
      </v-toolbar>

      <v-content>
        <router-view></router-view>
      </v-content>

      <app-footer v-if="isShowFooter"></app-footer>
    </v-app>
  </div>
</template>

<script>
import AppFooter from './components/AppFooter'

export default {
  name: 'App',
  components: {
    'app-footer': AppFooter,
  },
  data() {
    return {
      drawer: null,
      path: '/',
    }
  },
  computed: {
    toolbarTitle() {
      switch (this.path) {
        case '/tictactoe':
          return 'Крестики-нолики'
        case '/balda':
          return 'Балда'
        default:
          return 'Настольные игры'
      }
    },

    isShowHomeLink() {
      return this.path !== '/'
    },

    isShowFooter() {
      return this.path === '/'
    },
  },

  watch: {
    $route(newRoute) {
      this.path = newRoute.path
    },
  },
}
</script>

<style>
body {
  font-family: Roboto, sans-serif;
}

.toast-wrapper {
  width: 550px !important;
  max-width: 90vw !important;
}
</style>
