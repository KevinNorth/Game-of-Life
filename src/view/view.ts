/// <reference path="../logic/grid.ts" />

module View {
  var div: any = document.getElementById('grid');
  var numRowsInput: any = document.getElementById('num_rows');
  var numColumnsInput: any = document.getElementById('num_columns');
  var updateButton: any = document.getElementById('update_button');
  var resetButton: any = document.getElementById('reset_button');

  /* Prepares the DOM to act as the view for the game of life. */
  export function init(): void {
    updateButton.onclick = update;
    resetButton.onclick = reset;

    reset();
  }

  /* Executes one iteration of the Game of Life and updates the grid
   * accordingly. */
  export function update(): void {
    var currentState: boolean[][] = getCurrentState();
    var grid: Grid.Grid = new Grid.Grid(currentState);
    grid.performIteration();
    var newState = grid.getCurrentState();
    setState(newState);
  }

  function getCurrentState(): boolean[][] {
    var numRows: number = numRowsInput.value;
    var numColumns: number = numColumnsInput.value;
    var currentState: boolean[][] = [];

    for (var i: number = 0; i < numRows; i++) {
      currentState[i] = [];
      for (var j: number = 0; j < numColumns; j++) {
        var id: string = calculateCheckboxId(i, j);
        var checkbox: any = document.getElementById(id);
        currentState[i][j] = checkbox.checked;
      }
    }

    return currentState;
  }

  function setState(newState: boolean[][]): void {
    for (var i: number = 0; i < newState.length; i++) {
      for (var j: number = 0; j < newState[i].length; j++) {
        var id: string = calculateCheckboxId(i, j);
        var checkbox: any = document.getElementById(id);
        if(checkbox) {
          checkbox.checked = newState[i][j];
        }
      }
    }
  }

  /* Resets the Game of Life to an empty grid and changes the number of rows and
   * columns based on the numbers entered on the webpage. */
  export function reset(): void {
    clearGrid();

    var numRows: number = numRowsInput.value;
    var numColumns: number = numColumnsInput.value;

    var table: any = initializeTable();
    div.appendChild(table);

    var tableBody: any = document.createElement("tbody");
    table.appendChild(tableBody);

    for (var i: number = 0; i < numRows; i++) {
      var tableRow: any = document.createElement("tr");
      for (var j: number = 0; j < numColumns; j++) {
        var tableCell: any = document.createElement("td");
        var checkbox: any = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.value = "0";
        checkbox.id = calculateCheckboxId(i, j);
        checkbox.checked = false;
        tableCell.appendChild(checkbox);
        tableRow.appendChild(tableCell);
      }
      tableBody.appendChild(tableRow);
    }
  }

  function clearGrid(): void {
    // This pattern borrowed from http://stackoverflow.com/questions/3955229/
    while (div.firstChild) {
      div.removeChild(div.firstChild);
    }
  }

  function initializeTable(): any {
    var table: any = document.createElement("table");
    var header: any = document.createElement("thead")
    table.appendChild(header);
    return table;
  }

  function calculateCheckboxId(row: number, column: number): string {
    return row.toString() + ',' + column.toString();
  }
}
