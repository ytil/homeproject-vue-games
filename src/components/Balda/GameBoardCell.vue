<template>
  <td
    v-on="$listeners"
    class="cell"
    :class="{ available: available, target: target, selected: selected }"
    @click.stop="openLetterPicker"
  >
    {{ displayedLetter.toUpperCase() }}

    <v-dialog v-model="showPicker" width="300" :disabled="isDisabledDialogModal" lazy>
      <app-letter-picker
        @apply="applyLetter"
        @cancel="showPicker = false"
        :key="rerenderPickerKey"
      ></app-letter-picker>
    </v-dialog>
  </td>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import LetterPicker from './LetterPicker'

export default {
  name: 'GameTableCell',
  components: {
    'app-letter-picker': LetterPicker,
  },

  props: {
    cellIndex: Number,
    rowIndex: Number,
    letter: String,
    available: Boolean,
    target: Boolean,
    selected: Boolean,
  },

  data() {
    return {
      showPicker: false,
      rerenderPickerKey: 1
    }
  },

  computed: {
    ...mapState('balda', ['targetCell']),

    displayedLetter() {
      return this.target ? this.targetCell.letter : this.letter
    },

    isDisabledDialogModal() {
      return !this.available || this.targetCell.letter !== null
    },
  },

  methods: {
    ...mapMutations('balda', ['SET_TARGET_CELL']),

    openLetterPicker() {
      if (!this.isDisabledDialogModal) {
        this.showPicker = true
        this.rerenderPickerKey = this.rerenderPickerKey + 1
      }
    },

    applyLetter(letter) {
      this.showPicker = false

      const payload = {
        cellIndex: this.cellIndex,
        rowIndex: this.rowIndex,
        letter,
      }
      this.SET_TARGET_CELL(payload)
    },
  },
}
</script>

<style lang="scss" scoped>
.cell {
  display: table-cell;
  position: relative;
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  border: 2px solid gray;
  cursor: pointer;

  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
  }

  &.available {
    background-color: lightblue;
  }

  &.target {
    background-color: lightgrey;
  }

  &.selected {
    background-color: goldenrod;
    color: white;
  }
}
</style>
