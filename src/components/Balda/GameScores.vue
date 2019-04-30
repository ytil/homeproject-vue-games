<template>
  <div class="game-scores">
    <table>
      <tr>Игрок 1 {{scores.player1.total || 0}} </tr>
      <tr v-for="(word, idx) in scores.player1.usedWords" :key="idx">
        <td>{{word}}</td>
      </tr>
    </table>

    <table>
      <tr>Игрок 2 {{scores.player2.total || 0}} </tr>
      <tr v-for="(word, idx) in scores.player2.usedWords" :key="idx">
        <td>{{word}}</td>
      </tr>
    </table>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: "GameScores",
    computed: {
      ...mapState('balda', ['scores'])
    }
  }
</script>

<style scoped>

</style>