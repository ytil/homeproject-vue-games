export default class WinChecker {
  constructor(x, y, player, matrix, winningLine) {
    this.x = x
    this.y = y
    this.player = player
    this.matrix = matrix
    this.winningLine = winningLine
    this.s = winningLine - 1 // best possible substring length from click point to matrix extremum
    this.MAX_X_AXIS_VALUE = matrix[0].length - 1
    this.MAX_Y_AXIS_VALUE = matrix.length - 1
  }

  getTopSubstring(x, y, s) {
    const result = []

    while (y > 0 && s > 0) {
      y = y - 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result.reverse()
  }

  getBottomSubstring(x, y, s) {
    const result = []

    while (y < this.MAX_Y_AXIS_VALUE && s > 0) {
      y = y + 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result
  }

  getLeftSubstring(x, y, s) {
    const result = []

    while (x > 0 && s > 0) {
      x = x - 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result.reverse()
  }

  getRightSubstring(x, y, s) {
    const result = []

    while (x < this.MAX_X_AXIS_VALUE && s > 0) {
      x = x + 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result
  }

  getTopLeftSubstring(x, y, s) {
    const result = []

    while (x > 0 && y > 0 && s > 0) {
      x = x - 1
      y = y - 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result.reverse()
  }

  getTopRightSubstring(x, y, s) {
    const result = []

    while (x < this.MAX_X_AXIS_VALUE && y > 0 && s > 0) {
      x = x + 1
      y = y - 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result.reverse()
  }

  getBottomLeftSubstring(x, y, s) {
    const result = []

    while (x > 0 && y > this.MAX_Y_AXIS_VALUE && s > 0) {
      x = x - 1
      y = y + 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result
  }

  getBottomRightSubstring(x, y, s) {
    const result = []

    while (x < this.MAX_X_AXIS_VALUE && y < this.MAX_Y_AXIS_VALUE && s > 0) {
      x = x + 1
      y = y + 1
      s = s - 1

      let cell = this.matrix[y][x]
      if (cell === null || cell !== this.player) {
        break
      }
      result.push(cell)
    }

    return result
  }

  getHorizontal() {
    return [
      ...this.getLeftSubstring(this.x, this.y, this.s),
      this.player,
      ...this.getRightSubstring(this.x, this.y, this.s),
    ].join('')
  }

  getVertical() {
    return [
      ...this.getTopSubstring(this.x, this.y, this.s),
      this.player,
      ...this.getBottomSubstring(this.x, this.y, this.s),
    ].join('')
  }

  getFirstDiagonal() {
    return [
      ...this.getTopLeftSubstring(this.x, this.y, this.s),
      this.player,
      ...this.getBottomRightSubstring(this.x, this.y, this.s),
    ].join('')
  }

  getSecondDiagonal() {
    return [
      ...this.getTopRightSubstring(this.x, this.y, this.s),
      this.player,
      ...this.getBottomLeftSubstring(this.x, this.y, this.s),
    ].join('')
  }

  getPossibleWinningLines() {
    const horizontal = this.getHorizontal()
    const vertical = this.getVertical()
    const firstDiagonal = this.getFirstDiagonal()
    const secondDiagonal = this.getSecondDiagonal()

    return [horizontal, vertical, firstDiagonal, secondDiagonal]
  }

  calc() {
    const regexp = new RegExp(`[${this.player}]{${this.winningLine}}`)
    const lines = this.getPossibleWinningLines()
    const winner = lines.some(line => regexp.test(line))

    return winner
  }
}
