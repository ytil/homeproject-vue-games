<template>
  <td>
    <v-popover :open="open" @apply-show="open = true" @hide="open = false">
      <slot></slot>

      <template slot="popover">
        <app-alphabet-picker
          @letter-selected="open = false"
          @letter-not-selected="open = false"
        ></app-alphabet-picker>
      </template>
    </v-popover>
  </td>
</template>

<script>
import AlphabetPicker from "../components/AlphabetPicker";

export default {
  name: "BaldaTableCell",
  components: {
    "app-alphabet-picker": AlphabetPicker
  },
  data() {
    return {
      open: false
    };
  }
};
</script>

<style lang="scss" scoped>
td {
  border: 2px solid gray;
  cursor: pointer;
  font-size: 30px;

  &:hover {
    background-color: lightgrey;
  }
}
</style>

<style lang="scss">
.v-popover {
  width: 80px;
  height: 80px;
}

.trigger {
  width: 100%;
  height: 100%;
}

.tooltip {
  display: block !important;
  z-index: 10000;

  &.popover {
    $color: #f9f9f9;

    .popover-inner {
      background: $color;
      color: black;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, 0.1);
    }

    .popover-arrow {
      border-color: $color;
    }
  }

  &[aria-hidden="true"] {
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.15s, visibility 0.15s;
  }

  &[aria-hidden="false"] {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.15s;
  }
}
</style>
