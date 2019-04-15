<template>
  <div id="app">
    <v-app>
      <v-content>
        <router-view></router-view>
      </v-content>

      <v-footer app color="primary" dark height="auto">
        <div class="ma-auto">
          &copy; Иванников Дмитрий, {{ new Date().getFullYear() }}

          <v-layout d-inline ml-5>
            <v-btn href="https://github.com/ytil" tag="a" target="_blank" icon small>
              <v-icon>fab fa-github</v-icon>
            </v-btn>

            <v-btn href="https://t.me/ytil357" tag="a" target="_blank" icon small>
              <v-icon>fab fa-telegram</v-icon>
            </v-btn>

            <v-btn href="mailto:ivannikov.web@gmail.com" tag="a" target="_blank" icon small>
              <v-icon>fab fa-google</v-icon>
            </v-btn>
          </v-layout>
        </div>
      </v-footer>
    </v-app>
  </div>
</template>

<script>

export default {
  name: "App",
};
</script>
