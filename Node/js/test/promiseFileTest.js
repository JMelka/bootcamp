/*
var main = require('../promiseFile');

var assert = require('assert');

var fs = require('fs');

var chai = require("chai");

var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe('read file', function () {    
    it('gets data from file', function () {        
        return main.readFile('file.txt', 'utf8').should.eventually.equal("example");
    });
});
*/

//describe('add two numbers', function () {    it('should return the sum', function () {        var result = sum(1,1);        assert.equal(2, result);    })})

/*
describe('read file', function () {    
    it('gets data from file', function (done) {        
        fs.readFile('file.txt', 'utf8', function (err, contents) {               
                if (err) {                    
                     //reject(err);                    
                     return;                
                }       

                try {
                    assert.equal(contents, 'blaa');  
                    done('Good');
                } catch (ex) {
                    console.log(ex)
                    done('Bad');
                } 
                
    })
})
*/



/*
describe('add one number', function () {    it('should return the sum', function () {        var result = sum(1);        assert.equal(1, result);    })})describe('add zero numbers', function () {    it('should return the sum', function () {        var result = sum();        assert.equal(0, result);    })})describe('passing in strings', function () {    it('should return an error', function () {        var error = false;        try {                        sum('test','test');        } catch (err) {            error = true;        }        assert.isTrue(error);            })})
*/



//example

var main = require('../promiseFile');
var fs = require('fs');

var chai = require("chai");

var chaiAsPromised = require("chai-as-promised");

chai.use(chaiAsPromised);
chai.should();

describe('read file', function () {    
    it('gets data from file', function () {        
        return main.readFile('file.txt', 'utf8').should.eventually.equal("example");    
    });
});

