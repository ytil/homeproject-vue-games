<template>
  <v-footer app color="indigo" dark height="auto">
    <v-layout justify-center align-center wrap>
      <v-flex shrink>
        &copy; Иванников Дмитрий, {{ new Date().getFullYear() }}
      </v-flex>

      <v-flex shrink>
        <v-btn
          href="https://github.com/ytil/homeproject-vue-games"
          tag="a"
          target="_blank"
          icon
          small
        >
          <v-icon>fab fa-github</v-icon>
        </v-btn>

        <v-btn href="https://t.me/ytil357" tag="a" target="_blank" icon small>
          <v-icon>fab fa-telegram</v-icon>
        </v-btn>

        <v-btn
          href="mailto:ivannikov.web@gmail.com"
          tag="a"
          target="_blank"
          icon
          small
        >
          <v-icon>fab fa-google</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
  </v-footer>
</template>

<script>
export default {
  name: 'AppFooter',
}
</script>
