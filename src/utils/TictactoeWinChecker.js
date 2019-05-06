export default class TictactoeWinChecker {
  constructor(cellIndex, rowIndex, player, matrix, winningLine) {
    this.cellIndex = cellIndex
    this.rowIndex = rowIndex
    this.player = player
    this.matrix = matrix
    this.winningLine = winningLine
    this.maxSubstringLength = winningLine - 1 // best possible substring length from click point to matrix extremum
    this.MAX_X_AXIS_VALUE = matrix[0].length - 1
    this.MAX_Y_AXIS_VALUE = matrix.length - 1
  }

  getTopSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (rowIndex > 0 && substringLength > 0) {
      rowIndex = rowIndex - 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getBottomSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (rowIndex < this.MAX_Y_AXIS_VALUE && substringLength > 0) {
      rowIndex = rowIndex + 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getLeftSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex > 0 && substringLength > 0) {
      cellIndex = cellIndex - 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getRightSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex < this.MAX_X_AXIS_VALUE && substringLength > 0) {
      cellIndex = cellIndex + 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getTopLeftSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex > 0 && rowIndex > 0 && substringLength > 0) {
      cellIndex = cellIndex - 1
      rowIndex = rowIndex - 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getTopRightSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex < this.MAX_X_AXIS_VALUE && rowIndex > 0 && substringLength > 0) {
      cellIndex = cellIndex + 1
      rowIndex = rowIndex - 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getBottomLeftSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex > 0 && rowIndex < this.MAX_Y_AXIS_VALUE && substringLength > 0) {
      cellIndex = cellIndex - 1
      rowIndex = rowIndex + 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getBottomRightSubstring(cellIndex, rowIndex, substringLength) {
    const result = []

    while (cellIndex < this.MAX_X_AXIS_VALUE && rowIndex < this.MAX_Y_AXIS_VALUE && substringLength > 0) {
      cellIndex = cellIndex + 1
      rowIndex = rowIndex + 1
      substringLength = substringLength - 1

      let cellContent = this.matrix[rowIndex][cellIndex]
      if (cellContent === null || cellContent !== this.player) {
        break
      }
      result.push(cellContent)
    }

    return result
  }

  getHorizontal() {
    return [
      ...this.getLeftSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
      this.player,
      ...this.getRightSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
    ].join('')
  }

  getVertical() {
    return [
      ...this.getTopSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
      this.player,
      ...this.getBottomSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
    ].join('')
  }

  getFirstDiagonal() {
    return [
      ...this.getTopLeftSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
      this.player,
      ...this.getBottomRightSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
    ].join('')
  }

  getSecondDiagonal() {
    return [
      ...this.getBottomLeftSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
      this.player,
      ...this.getTopRightSubstring(
        this.cellIndex,
        this.rowIndex,
        this.maxSubstringLength,
      ),
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
    const isWinner = lines.some(line => regexp.test(line))

    return isWinner
  }
}
