declare module TreeStructure {
  export interface TreeNodes {
    treeNodes: String[];
    departmentId: String;
    voteWinnerLabel: String;
    winners: Winners;
    rootLabel: String;
  }

  export interface Winners {
    winnersLvlOne: string[];
    winnersLvlTwo: string[];
    winnersLvlThree: string[];
    winnersLvlFour: string[];
    winnersLvlFive: string[];
    allWinners: string[];

    percentOne: string;
    percentTwo: string;
    percentThree: string;
    percentFour: string;
    percentFive: string;
  }
}
