<template>
  <v-container>
    <h1>Сыграй в балду</h1>

    <p>правила:</p>

    <table
      @mousedown="startSelect"
      @mouseup="dragStart = false"
      @mouseover="trackCells"
      ref="board"
    >
      <tr v-for="(row, rowIndex) in board" :key="rowIndex">
        <app-cell
          v-for="(cell, cellIndex) in row"
          :key="cellIndex"
          :x="cellIndex"
          :y="rowIndex"
          :letter="cell"
        ></app-cell>
      </tr>
    </table>

    <v-btn @click="CHANGE_WORD">Другое слово</v-btn>

    <v-btn color="success">Сделать ход</v-btn>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import GameTableCell from '../components/Balda/GameTableCell'

export default {
  name: 'Balda',
  components: {
    'app-cell': GameTableCell,
  },

  data() {
    return {
      dragStart: false,
      wordCandidate: [],
      lastSelectedCell: {
        x: null,
        y: null,
      },
    }
  },

  computed: {
    ...mapState('balda', ['board', 'targetCell']),
  },

  mounted() {
    this.CHANGE_WORD()
  },

  methods: {
    ...mapActions('balda', ['CHANGE_WORD']),

    startSelect(e) {
      const table = this.$refs.board
      let target = e.target

      while (target !== table) {
        if (target.tagName === 'TD') {
          break
        }

        target = target.parentNode
      }
      if (target === table) return

      const x = target.cellIndex
      const y = target.parentNode.rowIndex
      this.lastSelectedCell = {x, y}
      this.dragStart = true
    },

    trackCells(e) {
      if (this.targetCell.status === 'none' || this.dragStart === false) return

      const table = this.$refs.board
      let target = e.target

      while (target !== table) {
        if (target.tagName === 'TD') {
          break
        }

        target = target.parentNode
      }
      if (target === table) return

      const x = target.cellIndex
      const y = target.parentNode.rowIndex

      if (x === this.lastSelectedCell.x && y === this.lastSelectedCell.y) {
        return
      }

      this.lastSelectedCell.x = x
      this.lastSelectedCell.y = y

      const selectedLetter = this.board[y][x]
      this.wordCandidate.push(selectedLetter)
    },
  },
}
</script>

<style lang="scss" scoped>
table {
  border-collapse: separate;
  border-spacing: 10px;
}
</style>
