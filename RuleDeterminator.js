class RuleDeterminator {
  constructor(moves) {
    this.moves = moves;
  }

  determineWinner(userMove, computerMove) {
    const userIndex = this.moves.indexOf(userMove);
    const computerIndex = this.moves.indexOf(computerMove);
    if (userIndex === computerIndex) return "It's a draw";
    if (
      (userIndex - computerIndex + this.moves.length) % this.moves.length <=
      this.moves.length / 2
    )
      return "Lose";
    return "Win";
  }
}

export default RuleDeterminator;
