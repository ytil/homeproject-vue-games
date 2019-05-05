class GetCellNeighbours {
  constructor(cellIndex, rowIndex) {
    this.cellIndex = cellIndex
    this.rowIndex = rowIndex
  }

  getTopNeighbourCell() {
    if (this.rowIndex > 0) {
      return {
        x: this.cellIndex,
        y: this.rowIndex - 1,
      }
    } else {
      return null
    }
  }

  getBottomNeighbourCell() {
    if (this.rowIndex < 4) {
      return {
        x: this.cellIndex,
        y: this.rowIndex + 1,
      }
    } else {
      return null
    }
  }

  getLeftNeighbourCell() {
    if (this.cellIndex > 0) {
      return {
        x: this.cellIndex - 1,
        y: this.rowIndex,
      }
    } else {
      return null
    }
  }

  getRightNeighbourCell() {
    if (this.cellIndex < 4) {
      return {
        x: this.cellIndex + 1,
        y: this.rowIndex,
      }
    } else {
      return null
    }
  }

  getAllNeighbours() {
    return [
      this.getTopNeighbourCell(),
      this.getBottomNeighbourCell(),
      this.getLeftNeighbourCell(),
      this.getRightNeighbourCell(),
    ]
  }
}

export default function(cellIndex, rowIndex) {
  const cell = new GetCellNeighbours(cellIndex, rowIndex)
  return cell.getAllNeighbours()
}
