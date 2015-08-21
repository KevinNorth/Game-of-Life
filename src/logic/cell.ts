module Cell {
  /* Keeps track of a single cell's status in the game of life. */
  export class Cell {
    private static DEFAULT_NEIGHBORS_FOR_SURIVAL: number[] = [2, 3];
    private static DEFAULT_NEIGHBORS_FOR_BIRTH: number[] = [3];

    public neighborsForSurvival: number[];
    public neighborsForBirth: number[];

    constructor(public alive: boolean, neighborsForSurvival?: number[],
      neighborsForBirth?: number[]) {
      this.neighborsForSurvival = neighborsForSurvival ?
        neighborsForSurvival : Cell.DEFAULT_NEIGHBORS_FOR_SURIVAL;
      this.neighborsForBirth = neighborsForBirth ?
        neighborsForBirth : Cell.DEFAULT_NEIGHBORS_FOR_BIRTH;
    }

    determineNewStatus(neighbors: Cell[]):boolean {
      var numAlive: number = 0;

      for (var i: number = 0; i < neighbors.length; i++) {
        if(neighbors[i].alive) {
            numAlive++;
        }
      }

      if (this.alive) {
        return this.neighborsForSurvival.indexOf(numAlive) != -1;
      } else {
        return this.neighborsForBirth.indexOf(numAlive) != -1;
      }
    }
  }
}
