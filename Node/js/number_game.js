//prompt user 1-10
//randomly pick number
//if guess correct, user wins
//if wrong. display computer wins

var prompt = require('prompt-sync')();

while (true){


    var n = prompt('Enter a number between 1 and 10:');

    n = Number.parseInt(n);
    //console.log('Guess: ', n);

    if (!isNaN(n) && n >= 1 && n <= 10){
        break;
    }

    console.log("Entry was invalid")

}

var compGuess = 10 * Math.random() //0.0 - 1.0
compGuess = Math.ceil(compGuess);
//Math.ceil(3.5) //4
//Math.floor (3.5) //3

if (n === compGuess){

    console.log('Winner')

} else {

    console.log('Loser - Computer Picked: ', compGuess);

}

console.log('Guess: ', n);
console.log('Comp Guess', compGuess);









