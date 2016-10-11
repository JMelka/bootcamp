var main = require('../db.js');
var assert = require('assert');

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var sqlite = require('sqlite3');
var TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;


describe('testing users', function () {
    var db = new TransactionDatabase(
       new sqlite.Database("test.sqlite", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE)
    );

    var transaction;
    beforeEach(function () {
        db.beginTransaction(function (err, trans) {
            if (err) {
                console.log(err);
                return;
            }
            transaction = trans;
        });
    });

    afterEach(function () {
        transaction.rollback(function (err) {
            if (err) {
                console.log('transaction: ', err);    
            }
        });
    });

    it('creates a user', function () {
        return main.createUser('Dan', 'Accountant').then(
            (userId) => {
                return main.getUser(userId);    
            }
        ).should.eventually.contain.all.keys({Name: 'Dan', Profile: 'Accountant'});
    });

    it('get all tweets of people followed', function () {
        var p = main.allFollowingTweets(0);
        return Promise.all([
            p.should.have.length.equal(2)

        ]);
    });
});