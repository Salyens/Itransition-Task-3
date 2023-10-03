import chalk from "chalk";

class TableGenerator {
  constructor(moves) {
    this.moves = moves;
    this.maxMoveLength = Math.max(
      ...moves.map((move) => move.length),
      "v PC\\User >".length
    );
  }

  padCell(content) {
    const totalPadding = this.maxMoveLength - content.length;
    const paddingLeft = Math.floor(totalPadding / 2);
    const paddingRight = totalPadding - paddingLeft;
    return content
      .padStart(content.length + paddingLeft)
      .padEnd(content.length + paddingLeft + paddingRight);
  }

  generateTable() {
    let table = chalk.yellow("+");
    table += chalk.yellow("-".repeat(this.maxMoveLength + 2) + "+");
    this.moves.forEach(
      () => (table += chalk.yellow("-".repeat(this.maxMoveLength + 2) + "+"))
    );

    table += `\n| ${this.padCell(chalk.greenBright("v PC\\User >"))} |`;
    this.moves.forEach(
      (move) => (table += ` ${chalk.greenBright(this.padCell(move))} |`)
    );

    this.moves.forEach((move, index) => {
      table += `\n${chalk.yellow("+")}${chalk.yellow(
        "-".repeat(this.maxMoveLength + 2)
      )}${chalk.yellow("+")}`;
      this.moves.forEach(
        () => (table += chalk.yellow("-".repeat(this.maxMoveLength + 2) + "+"))
      );

      table += `\n| ${chalk.blueBright(this.padCell(move))} |`;
      this.moves.forEach((_, innerIndex) => {
        if (index === innerIndex)
          table += ` ${chalk.blueBright(this.padCell("Draw"))} |`;
        else if (
          (index - innerIndex + this.moves.length) % this.moves.length <=
          this.moves.length / 2
        )
          table += ` ${chalk.blueBright(this.padCell("Lose"))} |`;
        else table += ` ${chalk.blueBright(this.padCell("Win"))} |`;
      });
    });

    table += `\n${chalk.yellow("+")}${chalk.yellow(
      "-".repeat(this.maxMoveLength + 2)
    )}${chalk.yellow("+")}`;
    this.moves.forEach(
      () => (table += chalk.yellow("-".repeat(this.maxMoveLength + 2) + "+"))
    );

    return table;
  }
}

export default TableGenerator;
