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
      var newStatuses: boolean[][] = [];

      // We have to determine the cells' new statuses before actually changing
      // any of their statueses, so they all change at once, which is why we
      // have two sets of loops.
      for (var i: number = 0; i < this.cells.length; i++) {
        newStatuses[i] = [];
        for (var j: number = 0; j < this.cells[i].length; j++) {
          newStatuses[i][j] = this.updateIndividualCell(i, j);
        }
      }

      for (var i: number = 0; i < this.cells.length; i++) {
        for (var j: number = 0; j < this.cells[i].length; j++) {
          this.cells[i][j].alive = newStatuses[i][j];
        }
      }
    }

    private updateIndividualCell(row: number, column: number): boolean {
      var neighbors: Cell.Cell[] = [];

      for (var i: number = row - 1; i <= row + 1; i++) {
        for (var j: number = column - 1; j <= column + 1; j++) {
          if((i == row) && (j == column)) {
            // Don't add the cell itself into the array of its neighbors
            continue;
          }
          if(i >= 0 && j >= 0
            && i < this.cells.length
            && j < this.cells[i].length) {
            neighbors.push(this.cells[i][j]);
          }
        }
      }

      var cell: Cell.Cell = this.cells[row][column];

      return cell.determineNewStatus(neighbors);
    }
  }
}
