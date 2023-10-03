import TableGenerator from "./TableGenerator.js";
import RuleDeterminator from "./RuleDeterminator.js";
import CryptoFunctions from "./CryptoFunctions.js";
import promptSync from "prompt-sync";
const prompt = promptSync({ sigint: true });

class Game {
  constructor(moves) {
    this.moves = moves;
    this.tableGenerator = new TableGenerator(moves);
    this.ruleDeterminator = new RuleDeterminator(moves);
    this.cryptoFunctions = new CryptoFunctions();
  }

  start() {
    const computerMove =
      this.moves[Math.floor(Math.random() * this.moves.length)];
    console.log(`HMAC: ${this.cryptoFunctions.generateHMAC(computerMove)}`);
    console.log("Available moves:");
    this.moves.forEach((move, i) => console.log(`${i + 1}. ${move}`));
    console.log("0. Exit");
    console.log("?. Help");

    const input = prompt("Enter your move: ");
    if (input === "0") return console.log("Bye!");
    if (input === "?") return console.log(this.tableGenerator.generateTable());
    const userMove = this.moves[Number(input) - 1];
    if (!userMove) return console.log("Invalid move!");

    const result = this.ruleDeterminator.determineWinner(
      userMove,
      computerMove
    );
    console.log(`Your move: ${userMove}`);
    console.log(`Computer move: ${computerMove}`);
    console.log(`You ${result}!`);
    console.log(`HMAC key: ${this.cryptoFunctions.key}`);
  }
}

const moves = process.argv.slice(2);
if (
  moves.length < 3 ||
  moves.length % 2 === 0 ||
  new Set(moves).size !== moves.length
) {
  console.error(
    "Invalid moves. Please provide an odd number of at least 3 unique moves."
  );
  process.exit(1);
}

const game = new Game(moves);
game.start();
