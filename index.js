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
  let maxNumber = await ask("What should be the maximum number I can guess to?\n")
  let max = parseInt(maxNumber);

  if (isNaN(max) || max <= 1) {
    console.log("Please enter a valid maximum number greater than 1");
    process.exit();
  }

  let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");

  let min = 1;
  let guess = Math.floor((min + max) /2);
  
  if (isNaN(secretNumber) || secretNumber < min || secretNumber > max) {
    console.log('Please enter a valid guess')
    process.exit()
  } else {
    console.log('You entered: ' + secretNumber);
  }

  let attempts = 0;
  let higherOrLower = null; 
  
  while (true) {
    let response = await ask (`Is your number... ${guess}? Type y for yes and n for no\n`)
    
    if (response.toLowerCase() === `n`) {
      console.log(`Dang! For reference, I guessed ${guess}`)
      
      if((higherOrLower === `h` && response === `l` || higherOrLower === `l` && response === `h`)) {
        console.log(`You are contradicting yourself! Play fair please.`)
        process.exit()
      }
      
    } else if (response.toLowerCase() === `y` ) {
      attempts ++;
      console.log(`I guessed it right! The number you chose is ${guess}!`)
      console.log(`It took me ${attempts} tries to guess your number`)
      process.exit()
      
    } else if (response.toLowerCase() !== `n` || `y`) {
      console.log("Please enter a valid response")
      process.exit();
    }
    
    let newResponse = await ask(`Is it higher or lower? Use h for higher and l for lower\n`)

    if ((higherOrLower === `h` && newResponse === `l` || higherOrLower === `l` && newResponse === `h`)) {
      console.log(`You are contradicting yourself! Play fair please.`)
      process.exit()
      }
    
    if (newResponse === `h`) {
      min = guess + 1;
      attempts ++;
    guess = Math.floor((min + max) /2);
  } else if (newResponse === `l`) {
    max = guess - 1;
    attempts ++;
    guess = Math.floor((min + max) /2);
  } else {
    console.log("Please choose a valid response.")
    process.exit();
  }

  }
  
}