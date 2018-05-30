declare module TreeStructure {
  export interface TreeNodes {
    treeNodes: String[];
    departmentId: String;
    voteWinnerLabel: String;
    winners: Winners;
  }

  export interface Winners {
    winnersLvlOne: string[];
    winnersLvlTwo: string[];
    winnersLvlThree: string[];
    winnersLvlFour: string[];
    winnersLvlFive: string[];
    allWinners: string[];
  }
}
