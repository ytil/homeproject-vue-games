<template>
  <div class="letter-picker">
    <v-layout>
      <v-text-field
        label="Введите букву"
        v-model="inputValue"
        maxlength="1"
        :rules="[rules.rus]"
      ></v-text-field>
    </v-layout>

    <v-layout mb-1>
      <span>или выберите из списка</span>
    </v-layout>

    <v-layout>
      <ul>
        <li
          v-for="(letter, idx) in alphabet"
          :key="idx"
          :data-letter="letter"
          :class="{ active: letter === lowercaseInput }"
          @click="handleClick"
        >
          {{ letter }}
        </li>
      </ul>
    </v-layout>

    <v-layout mt-2>
      <v-btn color="error" flat @click="cancel">Отмена</v-btn>
      <v-btn color="indigo" flat @click="apply">ОК</v-btn>
    </v-layout>
  </div>
</template>

<script>
import { alphabet } from '../../utils/alphabetRus'

export default {
  name: 'LetterPicker',
  data() {
    return {
      inputValue: '',
      rules: {
        rus: value =>
          alphabet.includes(value.toLowerCase()) || 'Только русские буквы',
      },
    }
  },
  computed: {
    lowercaseInput() {
      return this.inputValue.toLowerCase()
    },

    alphabet() {
      return alphabet
    },
  },
  methods: {
    handleClick(event) {
      this.inputValue = event.target.dataset.letter
    },

    apply() {
      if (this.inputValue !== '') {
        this.$emit('apply', this.lowercaseInput)
      }
    },

    cancel() {
      this.$emit('cancel')
    },
  },
}
</script>

<style lang="scss" scoped>
.letter-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 0;
  font-family: Roboto, sans-serif;
  background-color: white;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 200px;
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    margin: 3px;
    border: 1px solid gray;
    border-radius: 5px;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
      background-color: lightgrey;
    }

    &.active {
      background-color: lightgrey;
    }
  }
}
</style>

<style>
.v-text-field__slot input {
  text-transform: uppercase;
}
</style>
