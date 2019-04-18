<template>
  <div class="game-settings">
    <v-layout wrap align-center mb-1>
      <v-flex xs3>
        <b>Ширина</b>
      </v-flex>

      <v-flex xs9>
        <v-layout>
          <v-flex hidden-xs-only mr-5>
            <el-slider v-model.number="width" :min="3" :max="9"></el-slider>
          </v-flex>

          <v-flex ml-auto shrink>
            <el-input-number
              v-model.number="width"
              :min="3"
              :max="9"
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
          <v-flex hidden-xs-only mr-5>
            <el-slider v-model.number="height" :min="3" :max="9"></el-slider>
          </v-flex>

          <v-flex ml-auto shrink>
            <el-input-number
              v-model.number="height"
              :min="3"
              :max="9"
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
          <v-flex hidden-xs-only mr-5>
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
export default {
  name: "GameSettings",

  computed: {
    width: {
      get() {
        return this.$store.state.width;
      },
      set(value) {
        this.$store.commit("UPDATE_WIDTH", value);
      }
    },
    height: {
      get() {
        return this.$store.state.height;
      },
      set(value) {
        this.$store.commit("UPDATE_HEIGHT", value);
      }
    },
    winningLine: {
      get() {
        return this.$store.state.winningLine;
      },
      set(value) {
        this.$store.commit("UPDATE_WINNING_LINE", value);
      }
    },
    maxWinningLineValue() {
      const maxValue = this.width >= this.height ? this.width : this.height;
      return maxValue;
    }
  }
};
</script>

<style scoped>
.game-settings {
  max-width: 80%;
  margin: 0 auto;
}
</style>
