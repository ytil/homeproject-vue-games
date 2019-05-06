<template>
  <div>
    <v-layout justify-center mt-3>
      <h1 class="text-xs-center">Домашний проект по разработке настольных браузерных игр</h1>
    </v-layout>

    <v-layout justify-center mt-2>
      <b>
        Использованы следующие технологии и библиотеки:
      </b>
    </v-layout>

    <v-layout justify-center mb-5>
      <v-chip>Vue</v-chip>
      <v-chip>Vuex</v-chip>
      <v-chip>Vue-router</v-chip>
      <v-chip>Vuetify</v-chip>
    </v-layout>

    <v-layout justify-center>
      <h2>Во что играем?</h2>
    </v-layout>

    <v-container grid-list-lg>
      <v-layout justify-center wrap>
        <v-flex shrink>
          <v-card tile hover width="220" to="/balda">
            <v-card-title>
              <b class="title text-xs-center">Балда</b>
            </v-card-title>
            <v-img
              :src="require('../assets/balda.png')"
              alt="Балда"
              height="220"
            ></v-img>
          </v-card>
        </v-flex>

        <v-flex shrink>
          <v-card tile hover width="220" to="/tictactoe">
            <v-card-title>
              <b class="title">Крестики-нолики</b>
            </v-card-title>
            <v-img
              :src="require('../assets/tictactoe.png')"
              alt="Крестики-нолики"
              height="220"
            ></v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Home',
}
</script>
