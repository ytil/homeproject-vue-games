<template>
  <div class="alphabet-picker">
    <v-text-field
      autofocus
      label="Введите букву"
      v-model="inputValue"
      maxlength="1"
      :rules="[rules.rus]"
    ></v-text-field>

    <div>или выберите из списка</div>

    <ul>
      <li
        v-for="(letter, idx) in alphabet"
        :key="idx"
        :data-letter="letter"
        :class="{ active: letter === lowercaseInput }"
        @click="handleLetterClick"
      >
        {{ letter }}
      </li>
    </ul>

    <v-layout>
      <v-btn flat color="error" @click="onCancel">Отмена</v-btn>
      <v-btn flat color="primary" @click="onApply">ОК</v-btn>
    </v-layout>
  </div>
</template>

<script>
import { alphabet } from "../utils/alphabetRus";

export default {
  name: "AlphabetPicker",
  data() {
    return {
      inputValue: "",
      rules: {
        rus: value => alphabet.includes(value.toLowerCase()) || "Только русские буквы"
      }
    };
  },
  computed: {
    lowercaseInput() {
      return this.inputValue.toLowerCase()
    },
    alphabet() {
      return alphabet;
    }
  },
  methods: {
    handleLetterClick(event) {
      this.inputValue = event.target.dataset.letter;
    },
    onApply() {
      this.$emit('letter-selected', this.lowercaseInput)
    },
    onCancel() {
      this.$emit('letter-not-selected')
    }
  },
};
</script>

<style lang="scss" scoped>

.alphabet-picker {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 200px;
  margin: 0;
  padding: 0;
  list-style: none;
}

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

  &:hover {
    background-color: lightgrey;
  }

  &.active {
    background-color: lightgrey;
  }
}

</style>
