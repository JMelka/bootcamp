'use strict'

var im = require('immutable');

var map1 = im.Map({a:1, b:2, c:3});
var map2 = map1.set('b', 50);
console.log('Map1: ' + map1.get('b')); // 2
console.log('Map2: ' + map2.get('b')); // 50

var list1 = im.List.of(1, 2);
var list2 = list1.push(3, 4, 5);
var list3 = list2.unshift(0);
var list4 = list1.concat(list2, list3);

console.log(list1);
console.log(list2);
console.log(list3);
console.log(list4);

var arr = [7, 8, 9];

var val = arr.reduce(function (pre, val, idx, array){
    console.log(pre, val, idx);
    //return 'hi';
    return  pre + val;
}, 100);
console.log('result: ', val);


//filter from underscorjs
var arr2 = [8, 111, -90, 900, -500];

var val2 = arr2.filter(function (val, idx, array){
    return true;
});


console.log(arr2);
console.log(val2);
