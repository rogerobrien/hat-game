const prompt = require("prompt-sync")({ sigint: true });

const hat = "^ ";
const hole = "O ";
const fieldCharacter = "░ ";
const pathCharacter = "* ";

class Field {
  constructor(width, length) {
    this.width = width;
    this.length = length;
    this.startWidth = 0;
    this.startHeight = 0;
    this.field = [];
  }

  print() {
    console.log(this.field.map((row) => row.join("")).join("\n"));
  }

  generateField(width, height) {
    let createdField = Array.from({ length: height }, () => []);
    for (let inArr = 0; inArr < height; inArr++) {
      for (let outArr = 0; outArr < width; outArr++) {
        let pc = Math.floor(Math.random() * 11);
        if (pc <= 7) {
          createdField[inArr].push(fieldCharacter);
        } else {
          createdField[inArr].push(hole);
        }
      }
    }
    // Add the hat
    let setWidth = Math.floor(Math.random() * width);
    let setHeight = Math.floor(Math.random() * height);
    createdField[setHeight][setWidth] = hat;

    // Add the starting point
    do {
      this.startWidth = Math.floor(Math.random() * width);
      this.startHeight = Math.floor(Math.random() * height);
    } while (this.startWidth === setWidth && this.startHeight === setHeight);

    createdField[this.startHeight][this.startWidth] = pathCharacter;

    return (this.field = createdField);
  }

  playGame() {
    let playing = true;
    let input;
    this.generateField(this.width, this.length);

    let x = this.startWidth;
    let y = this.startHeight;

    this.print();

    while (playing) {
      input = prompt("select up(w), left(a), down(s) or right(d): ");

      if (input === "w" && y === 0) {
        console.log("You can't go up!");
      } else if (input === "s" && y === this.length - 1) {
        console.log("You can't go down!");
      } else if (input === "a" && x === 0) {
        console.log("You can't go left!");
      } else if (input === "d" && x === this.width - 1) {
        console.log("You can't go right!");
      } else {
        // Update position
        if (input === "w") y -= 1;
        else if (input === "s") y += 1;
        else if (input === "a") x -= 1;
        else if (input === "d") x += 1;
        else {
          console.log("Invalid input");
          continue;
        }

        // Check new position
        if (this.field[y][x] === hole) {
          console.log("You fell in a hole! Game over.");
          playing = false;
        } else if (this.field[y][x] === hat) {
          console.log("You found the hat! You win!");
          playing = false;
        } else {
          this.field[y][x] = pathCharacter;
          this.print();
        }
      }
    }
  }
}

// Create and play the game
const myField = new Field(5, 6);
myField.playGame();