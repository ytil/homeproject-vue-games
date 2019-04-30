<template>
  <td
    v-on="$listeners"
    :class="{ available: available, target: target, selected: selected }"
  >
    {{ displayedLetter.toUpperCase() }}

    <v-popover
      :open="isPopoverOpen"
      :disabled="isPopoverDisabled"
      @show="showPopover"
    >
      <template slot="popover">
        <app-letter-picker
          @apply="applyLetter"
          @cancel="isPopoverOpen = false"
          :key="rerenderLetterPickerKey"
        ></app-letter-picker>
      </template>
    </v-popover>
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
    x: Number,
    y: Number,
    letter: String,
    available: Boolean,
    target: Boolean,
    selected: Boolean,
  },

  data() {
    return {
      isPopoverOpen: false,
      rerenderLetterPickerKey: 1,
    }
  },

  computed: {
    ...mapState('balda', ['targetCell']),

    displayedLetter() {
      return this.target ? this.targetCell.letter : this.letter
    },

    isPopoverDisabled() {
      return !this.available || this.targetCell.letter !== null
    },
  },

  methods: {
    ...mapMutations('balda', ['SET_TARGET_CELL']),

    showPopover() {
      this.isPopoverOpen = true
      this.rerenderLetterPickerKey = this.rerenderLetterPickerKey + 1
    },

    applyLetter(letter) {
      this.isPopoverOpen = false
      const payload = { x: this.x, y: this.y, letter }
      this.SET_TARGET_CELL(payload)
    },
  },
}
</script>

<style lang="scss" scoped>
td {
  position: relative;
  width: 80px;
  height: 80px;
  font-size: 30px;
  text-align: center;
  border: 2px solid gray;
  cursor: pointer;

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

<style lang="scss">
.v-popover {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.trigger {
  width: 100%;
  height: 100%;
}

.tooltip {
  display: block !important;
  z-index: 10000;

  .tooltip-inner {
    background: black;
    color: white;
    border-radius: 16px;
    padding: 5px 10px 4px;
  }

  .tooltip-arrow {
    width: 0;
    height: 0;
    border-style: solid;
    position: absolute;
    margin: 5px;
    border-color: black;
    z-index: 1;
  }

  &[x-placement^='top'] {
    margin-bottom: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 0 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      bottom: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='bottom'] {
    margin-top: 5px;

    .tooltip-arrow {
      border-width: 0 5px 5px 5px;
      border-left-color: transparent !important;
      border-right-color: transparent !important;
      border-top-color: transparent !important;
      top: -5px;
      left: calc(50% - 5px);
      margin-top: 0;
      margin-bottom: 0;
    }
  }

  &[x-placement^='right'] {
    margin-left: 5px;

    .tooltip-arrow {
      border-width: 5px 5px 5px 0;
      border-left-color: transparent !important;
      border-top-color: transparent !important;
      border-bottom-color: transparent !important;
      left: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &[x-placement^='left'] {
    margin-right: 5px;

    .tooltip-arrow {
      border-width: 5px 0 5px 5px;
      border-top-color: transparent !important;
      border-right-color: transparent !important;
      border-bottom-color: transparent !important;
      right: -5px;
      top: calc(50% - 5px);
      margin-left: 0;
      margin-right: 0;
    }
  }

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      /*padding: 24px;*/
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden='true'] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden='false'] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
