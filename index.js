const { clear } = require('console');
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

start();


async function start() {
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  console.log('You entered: ' + secretNumber);

  let min = 1;
  let max = 100;
  let guess = Math.floor((min + max) /2);
  
  let attempts = 0;
  let running = true;
  
  while (running) {
    let response = await ask (`Is your number... ${guess}? Type y for yes and n for no\n`)
    
    if (response.toLowerCase() === `n`) {
      console.log("Fiddlesticks!")

    } else if (response.toLowerCase() === `y` ) {
      console.log(`I guessed it right! The number you chose is ${guess}!`)
      process.exit()

    } else if (response.toLowerCase !== `n` || `y`) {
      console.log("Please enter a valid response")
    }
    
    response = await ask(`Is it higher or lower? Use h for higher and l for lower\n`);
    
    
    if (response === `h`) {
      min = guess;
    guess = Math.floor((min + max) /2);
  } else if (response === `l`) {
    max = guess;
    guess = Math.floor((min + max) /2);
  } else {
    console.log("Please choose a valid response.")
  }
  

}

process.exit();
}
