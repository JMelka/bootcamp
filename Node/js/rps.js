var prompt = require('prompt-sync')();
var rock = 1;
var paper = 2;
var scisoors = 3;

console.log('Rock:1'); 
console.log('Paper:2');
console.log('Scissor:3');
var n = prompt('Enter a number between 1 and 3:');
var t = Math.floor(Math.random() * 3) + 1 ;    

console.log("\n" + "Your value:" + n);  
console.log("Computer value:" + t + "\n"); 

//if ((n==1 && t==1) || (n==2 && t==2) || (n==2 && t==2)) { 
if ((n==t)) {    
    console.log('Draw, try again...');     
} else if (n==1 && t==2) {    
    console.log('You selected Rock and Computer selected Paper: Computer won!');     
}   else if (n==2 && t==1) {    
    console.log('You selected Paper and Computer selected Rock: You won!');     
} else if (n==1 && t==3) {    
    console.log('You selected Rock and Computer selected Scissor: You won!');     
}   else if (n==3 && t==1) {    
    console.log('You selected Scissor and Computer selected Rock: Computer won!');     
} else if (n==2 && t==3) {    
    console.log('You selected Paper and Computer selected Scissor: Computer won!');     
}   else if (n==3 && t==2) {    
    console.log('You selected Scissor and Computer selected Paper: You won!');     
} else {      console.log ('something is not right!');  }

/*
var prompt = require('prompt-sync') ();
var candidates = [{    'name': 'rock',    'abbr': 'r',     'beats': 2}, {    'name': 'paper',    'abbr': 'p',     'beats': 0}, {    'name': 'scissors',    'abbr': 's',     'beats': 1}];var n = null;while (true){    n = prompt("Enter (r)ock, (p)aper or (s)cissors  (or 'x' to Exit): ");    if (!n || (n !== 'r' && n !== 'p' && n !== 's'))    {        if (n === 'x')            break;        console.log("Enter 'r' for rock, 'p' for paper, or 's' for scissors!");    }    else    {        var idx = Math.floor(Math.random() * 100) % 3;                for (var i = 0; i < candidates.length; i++)        {            if (candidates[i].abbr === n)            {                console.log("You chose " + candidates[i].name);                console.log("I chose " + candidates[idx].name);                if (i === idx)                {                    console.log("It's a draw!");                }                else if (candidates[idx].beats === i)                {                    console.log("I win!");                }                else                {                    console.log("You win!");                }                break;            }        }    }}
*/





