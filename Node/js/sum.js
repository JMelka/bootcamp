'use strict'

//function sum(...nums){
function sum(){

/*
    if (nums.length === 0){
        return 0;
    }
    */
    
    var acc = 0;

    for (var i in arguments){
        acc += arguments[i]; //acc = acc + i
    }


    return acc;

}


//sum(5, -3, 11); //returns 13


//function upperJoin(...strs){
function upperJoin(){
    str = '';
    
    for (var i in arguments){
        str = str.concat(arguments[i]);
    }
    return str.toUpperCase();

}

var y = sum(1, 8, 10);
console.log(y);

var s = upperJoin('hi', 'bye', 'yo'); // returns 'HIBYEYO'
console.log(s);

/*
function sum() {    var sum = 0;    for (var i in arguments) {        if (isNaN(arguments[i])) {            throw new Exception();        }    }    for (var i in arguments) {        sum += arguments[i];    }    return sum;}exports.sum = sum;

*/

exports.sum = sum;
exports.upperJoin = upperJoin;