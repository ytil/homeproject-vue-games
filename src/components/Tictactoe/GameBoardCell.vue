<template>
  <div
    class="cell"
    v-on="$listeners"
    @mousedown.prevent
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'GameBoardCell',
}
</script>

<style lang="scss" scoped>
.cell {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  height: 70px;

  outline: 2px solid gray;
  cursor: pointer;
  font-size: 20px;
  background-color: white;
  color: lightgray;

  &:not(.clicked):hover {
    background-color: lightgray;
  }
}

.cell-x {
  background-color: #3f51b5;
}

.cell-o {
  background-color: goldenrod;
}
</style>
