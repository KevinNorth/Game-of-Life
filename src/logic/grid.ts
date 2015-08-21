/// <reference path="cell.ts" />

module Grid {
  export class Grid {
    private cells: Cell.Cell[][];

    public constructor(initialState: boolean[][]) {
      this.cells = [];
      for (var i: number = 0; i < initialState.length; i++) {
        this.cells[i] = [];
        for (var j: number = 0; j < initialState[i].length; j++) {
          this.cells[i][j] = new Cell.Cell(initialState[i][j]);
        }
      }
    };

    public getCurrentState(): boolean[][] {
      var currentState: boolean[][] = [];

      for (var i: number = 0; i < this.cells.length; i++) {
        currentState[i] = [];
        for (var j: number = 0; j < this.cells[i].length; j++) {
          currentState[i][j] = this.cells[i][j].alive;
        }
      }

      return currentState;
    }

    public performIteration(): void {
      for (var i: number = 0; i < this.cells.length; i++) {
        for (var j: number = 0; j < this.cells[i].length; j++) {
          this.updateIndividualCell(i, j);
        }
      }
    }

    private updateIndividualCell(row: number, column: number): void {
      var neighbors: Cell.Cell[] = [];

      for (var i: number = row - 1; i <= row + 1; i++) {
        for (var j: number = column - 1; j <= column + 1; j++) {
          if(i == 0 && j == 0) {
            // Don't add the cell itself into the array of its neighbors
            continue;
          }
          if(this.cells[i][j]) {
            neighbors.push(this.cells[i][j]);
          }
        }
      }

      this.cells[row][column].updateStatus(neighbors);
    }
  }
}
