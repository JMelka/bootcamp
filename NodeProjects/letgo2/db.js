var fs = require('fs');
var sqlite3 = require('sqlite3').verbose(),
    TransactionDatabase = require("sqlite3-transactions").TransactionDatabase;

var db = new TransactionDatabase(new sqlite3.Database('./letgo.db'));

// exports 
exports.clearTables=clearTables;
exports.getUser=getUser;        // email
exports.insertUser=insertUser;  // name, email, location
exports.updateUser=updateUser;  // userid
exports.updateUserName=updateUserName;  // userid
exports.updateUserPassword=updateUserPassword;  // userid
exports.updateUserEmail=updateUserEmail;  // userid
exports.updateUserLocation=updateUserLocation;  // userid
exports.deleteUser=deleteUser;  // userid

exports.insertListing=insertListing;  // userid, description, price, category, location, photo
exports.getAllListings=getAllListings;   // NONE
exports.getSellList=getSellList; //userid
exports.getListings=getListings;  //  Listing object
exports.updateListing=updateListing;  //userid, listid, description, price, category, status, location, photo
exports.updateListingPrice=updateListingPrice; //userid, listid,price
exports.updateListingDescription=updateListingDescription; //userid, listid,description
exports.updateListingLocation=updateListingLocation;//userid, listid, location
exports.updateListingPhoto=updateListingPhoto; //userid, listid,photo
exports.updateListingStatus=updateListingStatus;//userid, listid,status
exports.deleteListing=deleteListing; //userid, listid

exports.getWatchList=getWatchList; // userid
exports.insertWatchList=insertWatchList; //userid, listid
exports.testInsertWatchlist=testInsertWatchlist;
exports.deleteWatchList=deleteWatchList; //userid, listid
exports.deleteEntireWatchList=deleteEntireWatchList; //
exports.getWatchersForListing=getWatchersForListing;

// Define objects
var user = {
    userid: '',
    name: '',
    password: '',
    location: '',
    email: ''
};
var listing = {
    listid: '',
    userName: '',
    userEmail: '',
    userid: '',
    description: '',
    price: '',
    category: '',
    status: '',
    location: '',
    imageFile: '', 
    insertDt: ''
};
var watchedListing = {
    userid: '',
    listid: '',
    insertDt: '',
    listing: ''
};

function createUserFrom(thisRow)
{
    var aUser = Object.create(user);
    aUser.userid = thisRow.USERID;
    aUser.name = thisRow.NAME;
    aUser.password = thisRow.PASSWORD;
    aUser.email = thisRow.EMAIL;
    aUser.location = thisRow.LOCATION;
    return aUser;
}
function createListingFrom(thisRow)
{
    var aListing = Object.create(listing);
    aListing.userid = thisRow.USERID;
    aListing.userName = thisRow.NAME;
    aListing.listid = thisRow.LISTID;
    aListing.userEmail = thisRow.EMAIL;
    aListing.description = thisRow.DESCRIPTION;
    aListing.price = thisRow.PRICE;
    aListing.category = thisRow.CATEGORY;
    aListing.status = thisRow.STATUS;
    aListing.location = thisRow.LOCATION;
    aListing.imageFile = thisRow.IMGFILE;
    aListing.insertDt = thisRow.INSERT_TS;
    return aListing;
}
function createWatchedListingFrom(thisRow)
{
    var aWatchedListing = Object.create(watchedListing);

    aWatchedListing.userid = thisRow.WUSERID;
    aWatchedListing.listid = thisRow.LISTID;
    aWatchedListing.insertDt = thisRow.INSERT_TS;
    aWatchedListing.listing = createListingFrom(thisRow);
    return aWatchedListing;
}

function initDB()
{
    db.serialize(function () {
        console.log("create User table");
        db.run("CREATE TABLE IF NOT EXISTS users \
        (USERID INTEGER PRIMARY KEY NOT NULL, \
        NAME TEXT NOT NULL, \
        PASSWORD TEXT NOT NULL, \
        EMAIL TEXT UNIQUE NOT NULL,\
        LOCATION TEXT)", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create listing table");
        db.run("CREATE TABLE IF NOT EXISTS listing \
        (LISTID INTEGER PRIMARY KEY NOT NULL, \
        USERID INT NOT NULL, \
        DESCRIPTION TEXT NOT NULL, \
        PRICE REAL NOT NULL, \
        CATEGORY TEXT NOT NULL, \
        STATUS TEXT NOT NULL, \
        LOCATION TEXT NOT NULL,\
        IMGFILE TEXT NOT NULL,\
        INSERT_TS DATETIME DEFAULT CURRENT_TIMESTAMP, \
        FOREIGN KEY (USERID) REFERENCES users(USERID))", function (err) { if (err) { console.log(err); } });
    });
    db.serialize(function () {
        console.log("create watchlist table");
        db.run("CREATE TABLE IF NOT EXISTS watchlist \
        (LISTID INT NOT NULL, \
        USERID INT NOT NULL, \
        INSERT_TS DATETIME DEFAULT CURRENT_TIMESTAMP , \
        CONSTRAINT WATCHID PRIMARY KEY (LISTID,USERID), \
        FOREIGN KEY (LISTID) REFERENCES listing(LISTID), \
        FOREIGN KEY (USERID) REFERENCES users(USERID))",
         function (err) { if (err) { console.log(err); } });
    });

}

function clearTables()
{
    clearWatchlistTable();
    clearListingTable();
    clearUserTable();
}
function clearUserTable()
{
    db.run("DELETE from users", function (err) { if (err) { } });
}
function clearListingTable()
{
    db.run("DELETE from listing", function (err) { if (err) { } }); //x
}
function clearWatchlistTable()
{
    db.run("DELETE from watchlist", function (err) { if (err) { } }); //x
}
function asMyQuote(input) {
    if (input === null)
        return null;
    if (input === undefined)
        return null;
    
    return '\'' + input + '\'';
}

function insertUser(name, email, location, password)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            if ((password === undefined) || (password === null))
            password = 'password';
            var values = asMyQuote(name) + ', ' + asMyQuote(password) + ', ' + asMyQuote(email) + ', ' + asMyQuote(location);
            var insertCommand = "INSERT INTO users (NAME, PASSWORD, EMAIL, LOCATION) VALUES (" + values + ")"
            console.log(insertCommand);
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve(this.lastID);
                });
        });
    });
    return p;
}
function updateUser(userid, name, email, location)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
             var updateCommand = "UPDATE users SET "
                + "NAME=" + asMyQuote(name) 
                + ", EMAIL=" + asMyQuote(email)
                + ", LOCATION=" + asMyQuote(location) 
                + " WHERE USERID=" + userid;
            console.log(updateCommand);
            db.run(updateCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function updateUserName(userid, name)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var updateCommand = "UPDATE users SET NAME=" + asMyQuote(name) + " WHERE USERID=" + userid;
            console.log(updateCommand);
            db.run(updateCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function updateUserPassword(userid, password)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var updateCommand = "UPDATE users SET PASSWORD=" + asMyQuote(password) + " WHERE USERID=" + userid;
            console.log(updateCommand);
            db.run(updateCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function updateUserEmail(userid, email)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var updateCommand = "UPDATE users SET EMAIL=" + asMyQuote(email) + " WHERE USERID=" + userid;
            console.log(updateCommand);
            db.run(updateCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function updateUserLocation(userid, location)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var updateCommand = "UPDATE users SET LOCATION=" + asMyQuote(location)  + " WHERE USERID=" + userid;
            console.log(updateCommand);
            db.run(updateCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve();
                });
        });
    });
    return p;
}
function getListidsForDelete(userid)  // returns a list of listids
{
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT LISTID FROM listing WHERE USERID=" + userid;
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            for (thisID of rows) {
                outputData[count] = thisID;
                count++;
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting my listing');
            return [];
        }
        );
    return p;
}

function deleteUser(userid)
{
    var p = new Promise(function (resolve, reject) 
    {

        db.beginTransaction(function(err, transaction) 
        {
            //Delete what user is watching
            var whereClause = " WHERE USERID=" + userid;
            var del1 = "DELETE FROM watchlist" + whereClause;
             console.log(del1);
             transaction.run(del1, function (err) { if (err) {transaction.rollback(); reject(err); }});
             // Delete my items being watched
             var del2 = "DELETE FROM watchlist WHERE listid IN (SELECT listid FROM listing" + whereClause +')';
             console.log(del2);
             transaction.run(del2, function (err) { if (err) {transaction.rollback(); reject(err); }});
             // Delete my listings
             var del3 = "DELETE FROM listing" + whereClause;
             console.log(del3);
             transaction.run(del3, function (err) { if (err) {transaction.rollback(); reject(err); }});
             // Delete the user
             var del4 = "DELETE FROM users" + whereClause;
             console.log(del4);
             transaction.run(del4, function (err) { if (err) { transaction.rollback(); reject(err); } });

             transaction.commit(function(err) {if (err){return console.log("Delete user failed.", err);}
                console.log("Delete user was successful.");
                resolve();
            });
        });
    });
    return p;
}

function getUser(email, password)
{
   var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "SELECT * FROM users WHERE EMAIL = " + asMyQuote(email);

            if ((password !== undefined) && (password !== null))        
                command = command + ' AND PASSWORD=' + asMyQuote(password);
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (row) => {
            // Process them.
            if (row.length == 0) return null;
            var aUser = createUserFrom(row[0]);
            console.log('User:  ' + aUser.userid);
            return aUser;
        },
        (err) => {
            console.log('Error getting user profile: ' + email);
            return null;
        }
        );
    return p;
}
function insertListing(userid, description, price, category, location, photo)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {
            var values = userid + ', ' + asMyQuote(description) + ', ' + price + ', ' + asMyQuote(category) + ', ' + asMyQuote(location) + ', ' + asMyQuote(photo) + ', ' + asMyQuote("POSTED");
            var insertCommand = "INSERT INTO listing (USERID, DESCRIPTION, PRICE, CATEGORY, LOCATION, IMGFILE, STATUS) VALUES (" + values + ")"
            db.run(insertCommand, 
                function (err) { 
                    if (err) 
                    { console.log(err);
                        reject(err);
                    } 
                    resolve(this.lastID);
                });
        });
    });
    return p;
}
function updateListing(userid, listid, description, price, category,status, location, photo)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET" 
             + createUpdateList(description, price, category,status, location, photo)
             + " WHERE LISTID=" + listid
             + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
             });
   });
    return p;
}
function createUpdateList(description, price, category,status, location, photo)
{
    var count = 0;
    var output = '';

    if ((description != undefined) && ( description != null))
    {
        if (count > 0)
            output += ',';
        output += " DESCRIPTION=" +asMyQuote(description);
        count++;
    }
    if ((category != undefined) && ( category != null))
    {
        if (count > 0)
            output += ',';
        output += " CATEGORY=" +asMyQuote(category);
        count++;
    }
    if ((status != undefined) && ( status != null))
    {
        if (count > 0)
            output += ',';
        output += " STATUS=" +asMyQuote(status);
        count++;
    }
    if ((location != undefined) && ( location != null))
    {
        if (count > 0)
            output += ',';
        output += " LOCATION=" +asMyQuote(location);
        count++;
    }
    if ((photo != undefined) && ( photo != null))
    {
        if (count > 0)
            output += ',';
        output += " IMGFILE=" +asMyQuote(photo);
        count++;
    }
    if ((price != undefined) && ( price != null))
    {
       if (count >0)
         output += ',';
       output += " PRICE=" + price;
    }
    return output;
}
function updateListingPrice(userid,listid, price)
{   
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET PRICE=" + price + " WHERE LISTID=" + listid + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
            });
    });
    return p;
}
function updateListingDescription(userid,listid, description)
{   
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qdescript = asMyQuote(description);
            var command = "UPDATE listing SET DESCRIPTION=" 
                + qdescript + " WHERE LISTID=" + listid 
                + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
            });
    });
    return p;
}
function updateListingLocation(userid,listid, location)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var qValue = asMyQuote(location);
            var command = "UPDATE listing SET LOCATION=" + qValue + " WHERE LISTID=" + listid + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
    return p;
}
function updateListingPhoto(userid,listid,photo)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET IMGFILE=" + asMyQuote(photo) + " WHERE LISTID=" + listid + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
    return p;
}
function updateListingStatus(userid,listid,status)
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "UPDATE listing SET STATUS=" + asMyQuote(status) + " WHERE LISTID=" + listid + " AND USERID=" + userid;
            console.log(command);
            db.run(command, function (err) {
                if (err) {
                    reject(err);
                }
                resolve();
            });
        });
    });
    return p;
}
function deleteListing(userid,listid)
{
    var p = new Promise(function (resolve, reject) {
        db.beginTransaction(function(err, transaction) 
        {
             var command = "DELETE FROM watchlist WHERE LISTID=" + listid;
             console.log(command);
             transaction.run(command, 
                function (err) { if (err) {transaction.rollback(); reject(err); } resolve(); });
             command = "DELETE FROM listing WHERE USERID=" + userid+ " AND LISTID=" + listid;
             console.log(command);
             transaction.run(command, 
                function (err) { if (err) { transaction.rollback();  reject(err); } resolve(); });

             transaction.commit(function(err) {
                if (err)
                {
                    return console.log("Delete failed.", err);
                }
                console.log("Delete Listing was successful.");
            });
        });
        
        // or transaction.rollback() 
    });
    return p;
}
function getAllListings()
{
    return getListings(null);
/*    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM listing";
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);
                outputData[count] = aListing;
                console.log('Listing#:  ' + aListing.listid);
                count++;
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting all listings');
            return [];
        }
        );
    return p;
  */
}
function getListings(inListing)
{
      var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {
            var command = "SELECT A.NAME, A.EMAIL, B.* FROM users as A inner join listing as B on A.USERID = B.USERID";
            if ((inListing != undefined) && (inListing != null))
                command += buildWhereClause(inListing);
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);
                outputData[count] = aListing;
                count++;
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting all listings');
            console.log(err);
            return [];
        }
        );
    return p;
  
}
function buildWhereClause(aListing)
{
    var WHERE = " AND ";
    var clause = "";
    var temp;
    temp = clauseFor(aListing.listid, "B.LISTID", false);
        if (temp != null) return WHERE + temp;
    temp = clauseFor(aListing.userid, "B.USERID", false);
        if (temp != null) return WHERE + temp;
    var clauses = [];

    clauses[0] = clauseFor(aListing.category, "B.CATEGORY", true);
    clauses[1] = clauseFor(aListing.status, "B.STATUS", true);
    clauses[2] = clauseFor(aListing.location, "B.LOCATION", true);
    var cnt = 0;
    var i = 0;
    for (i in clauses )
    {
        console.log("I = " + i + "cnt = " + cnt);
        if (clauses[i] != null)
        {
            if (cnt > 0)
                clause = clause + " AND ";
            clause = clause + clauses[i];
            cnt++;
        }
    }
    if (cnt == 0) return "";
    return WHERE + clause;
}
function clauseFor(value, column, qtFlag)
{
    console.log(value);

    if ((value === undefined) || (value === null) || (value.length == 0))
        return null;
    var clause = column + "=";
    if (qtFlag)
    {
        return clause + asMyQuote(value);
    }
    else
    {
        console.log(value);
        return clause + value;
    }
}
function getSellList(userid)  // returns a list of listing
{
    var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM listing WHERE USERID=" + userid;
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);

                outputData[count] = aListing;
                count++;
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting my listing');
            return [];
        }
        );
    return p;
}
function getWatchList(userid)  // returns a list of listing
{
    var p = new Promise(function (resolve, reject) {
        db.serialize(() => {
            var command = 'SELECT watchlist.LISTID,watchlist.USERID AS WUSERID,watchlist.INSERT_TS, '    
                    + 'listing.LISTID,listing.USERID,listing.DESCRIPTION,listing.PRICE,listing.CATEGORY,'
                    + 'listing.STATUS,listing.LOCATION,listing.IMGFILE,listing.INSERT_TS' 
            + ' FROM watchlist, listing WHERE watchlist.LISTID = listing.LISTID and watchlist.USERID = ' + userid + ' ORDER BY watchlist.INSERT_TS';
             console.log(command);
            db.all(command , (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            console.log("Returned " + rows.length + " rows");
            for (thisRow of rows) {
                var aListing = createWatchedListingFrom(thisRow);

                outputData[count] = aListing;
                count++;
            }
            return outputData;
        }
    );

    return p;    
}
function testInsertWatchlist(userid, listid)
{
    var p = new Promise(function (resolve, reject) {
    var command = 'SELECT COUNT(USERID) AS CNT FROM watchlist WHERE  LISTID=' + listid + ' AND USERID=' + userid;
        console.log(command);
        db.all(command , (err, rows) => {
        if (err) {
        reject(err);
        }
        resolve(rows);
        });
    }).then(
        (rows) => {
            return rows[0];
        }, (err) => {console.log(err);
    });
    return p;
}
function getWatchersForListing(listid)
{
        var p = new Promise(function (resolve, reject) {
        db.serialize(() => {
            var command = 'SELECT watchlist.LISTID,watchlist.USERID,watchlist.INSERT_TS, '    
                    + 'users.USERID, users.NAME, users.EMAIL, users.LOCATION'
                    + ' FROM watchlist, users'
                    + ' WHERE watchlist.LISTID = ' + listid + ' AND watchlist.USERID = users.USERID'  
                    + ' ORDER BY watchlist.INSERT_TS';
        console.log(command);
            db.all(command , (err, rows) => {
                if (err) {
                    reject(err);
                }
                resolve(rows);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            console.log("Returned " + rows.length + " rows");
            for (thisRow of rows) {
                var aListing = createUserFrom(thisRow);

                outputData[count] = aListing;
                count++;
            }
            return outputData;
        }, (err) => {console.log(err);}
    );
    return p;    
}
function insertWatchList(userid, listid)
{
   var p = new Promise(function (resolve, reject) {
       db.serialize(function () {
            var values = listid + ', ' + userid;
            var insertCommand = "INSERT INTO watchlist (LISTID, USERID) VALUES (" + values + ")"
             console.log(insertCommand);
            db.run(insertCommand, function (err) { if (err) { reject(err);}  resolve(this.lastID);});
        });
    });
    return p;
}
function deleteWatchList(userid,listid)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {

            var command = "DELETE FROM watchlist WHERE LISTID=" + listid + " AND USERID=" + userid;
             console.log(command);
            db.run(command,
                function (err){
                    if (err) {
                       reject(err);
                     }
                });
            resolve();
        });
    });
    return p;   
}
function deleteEntireWatchList(userid)
{
    var p = new Promise(function (resolve, reject) {
       db.serialize(function () {

            var command = "DELETE FROM watchlist WHERE USERID=" + userid;
             console.log(command);
            db.run(command,
                function (err){
                    if (err) {
                       reject(err);
                     }
                });
            resolve();
        });
    });
    return p;   
}
function getListingsLike(inListing)
{
      var p;
    p = new Promise(function (resolve, reject) {
        db.serialize(function () {

            var command = "SELECT * FROM listing";
            if ((inListing != undefined) && (inListing != null))
                command += buildWhereClause(inListing);
            console.log(command);
            db.all(command, function (err, row) {
                if (err) {
                    reject(err);
                }
                resolve(row);
            });
        });
    }).then(
        (rows) => {
            // Process them.
            var outputData = [];
            var count = 0;
            for (thisRow of rows) {
                var aListing = createListingFrom(thisRow);
                outputData[count] = aListing;
                count++;
            }
            return outputData;
        },
        (err) => {
            console.log('Error getting all listings');
            console.log(err);
            return [];
        }
        );
    return p;
  
}



initDB(db);