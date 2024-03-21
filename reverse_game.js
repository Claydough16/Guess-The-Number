const { clear } = require('console');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

async function start() {
    console.log("Let's play a game! I will think of a number and you will have to guess it!")
    let maxNumber = await ask("What should be the maximum number I can guess to?\n")
    let max = parseInt(maxNumber);
  
    if ( isNaN(max) || max <= 1) {
      console.log("Please enter a valid number! Must be greater than 1");
      process.exit();
    }
  
    let secretNumber = Math.floor(Math.random() * max) + 1;

    console.log("Okay! I've chose my number! Let's see if you can guess it");

    let attempts = 0;
    let running = true;

    while (running) {
        let guess = await ask("What's your guess?");

        if (isNaN(guess) || guess < 1 || guess > max) {
            console.log("Please enter a valid guess!")
            process.exit()
        } else {
            attempts ++;
        }

        if (guess < secretNumber) {
            console.log(`Nope! My number is greater than ${guess}`);
        } else if (guess > secretNumber) {
            console.log(`Nope! My number is less than ${guess}`);
        } else {
            console.log(`You guessed it! My number was ${secretNumber}! It took you ${attempts} attempts`);
            process.exit()
        }
    }

  }

  start();