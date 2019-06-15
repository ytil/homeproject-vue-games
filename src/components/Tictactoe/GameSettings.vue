<template>
  <div class="game-settings">
    <v-layout wrap align-center mb-1>
      <v-flex xs3>
        <b>Ширина</b>
      </v-flex>

      <v-flex xs9>
        <v-layout>
          <v-flex hidden-xs-only ml-1 mr-3>
            <el-slider v-model.number="width" :min="3" :max="5"></el-slider>
          </v-flex>

          <v-flex ml-auto shrink>
            <el-input-number
              v-model.number="width"
              :min="3"
              :max="5"
              size="small"
            ></el-input-number>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap align-center mb-1>
      <v-flex xs3>
        <b>Высота</b>
      </v-flex>

      <v-flex xs9>
        <v-layout>
          <v-flex hidden-xs-only ml-1 mr-3>
            <el-slider v-model.number="height" :min="3" :max="5"></el-slider>
          </v-flex>

          <v-flex ml-auto shrink>
            <el-input-number
              v-model.number="height"
              :min="3"
              :max="5"
              size="small"
            ></el-input-number>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <v-layout wrap align-center mb-1>
      <v-flex xs3>
        <b>Для победы</b>
      </v-flex>

      <v-flex xs9>
        <v-layout>
          <v-flex hidden-xs-only ml-1 mr-3>
            <el-slider
              v-model.number="winningLine"
              :min="3"
              :max="maxWinningLineValue"
            ></el-slider>
          </v-flex>

          <v-flex ml-auto shrink>
            <el-input-number
              v-model.number="winningLine"
              :min="3"
              :max="maxWinningLineValue"
              size="small"
            ></el-input-number>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'GameSettings',

  computed: {
    width: {
      get() {
        return this.$store.state.tictactoe.width
      },
      set(value) {
        this.UPDATE_WIDTH_VALUE(value)
      },
    },

    height: {
      get() {
        return this.$store.state.tictactoe.height
      },
      set(value) {
        this.UPDATE_HEIGHT_VALUE(value)
      },
    },

    winningLine: {
      get() {
        return this.$store.state.tictactoe.winningLine
      },
      set(value) {
        this.UPDATE_WINNING_LINE_VALUE(value)
      },
    },

    maxWinningLineValue() {
      const maxValue = this.width >= this.height ? this.width : this.height
      return maxValue
    },
  },

  methods: {
    ...mapMutations('tictactoe', [
      'UPDATE_WIDTH_VALUE',
      'UPDATE_HEIGHT_VALUE',
      'UPDATE_WINNING_LINE_VALUE',
    ]),
  },
}
</script>

<style>
  .game-settings {
    min-width: 70%;
  }
</style>
