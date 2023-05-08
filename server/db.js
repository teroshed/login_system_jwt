const mysql = require('mysql2');


// var con = mysql.createConnection({
//     host: 'db4free.net',
//     user: 'teroshedacc',
//     password: '987654321',
//     database: 'teroshedatabase'
// });
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vacations'
});


con.connect((err) => {
    if(err)
    {
        console.error("Error connecting to database.");
        return;
    }
    console.log("Connected to database.");

});



function authUser(email, password, callback)
{
    // console.log(con);
    let query = `SELECT userId, email, name, last_name, role FROM users WHERE email = '${email}' AND password = '${password}'`;
    con.query(query, (err, result) => {
        if(err)
        {
            console.log("error auth: " + err.message);
            result = {ok: false, data: {code: 404, message: "Unkonwn error"}};
            callback && callback(result);
        }
        else
        {
            callback && callback({ok: true, data: result});
        }
    });
}

function query(query, callback)
{
    // query = `SELECT * FROM users`;
    con.query(query, (err, res) => {
        if(err)
            console.error("Error query: ", err);
        else
            callback && callback(res);
    });
}
function getUsers(callback) {
    query = `SELECT * FROM users`;
    con.query(query, (err, res, rows) => {
        if(err)
            console.error("Error getting users: ", err);
        else
            callback && callback(res, rows);
    });
}


function query(query, callback)
{
    con.query(query, callback);
}

function dropTable() {
    let query = `DROP TABLE IF EXISTS users`;
    con.query(query, (err, res) => { 
        con.query(query, (err, res) => {
            if(err)
                console.error("Error dropping table, ", err);
            else
                console.error("Dropped table, ", res);
        })
    });
}

function addUser(email, password, name, last_name, callback)
{
    let query = `INSERT INTO users (email, password, name, last_name) VALUES ("${email}", "${password}", "${name}", "${last_name}")`;
    con.execute(query, (err, res) => {

        if(callback)
            callback(err, res);
    })
}


/**
 * Inserting a vacation without file name, and then checking the last ID, to decide what would be the image name
 * and then updating the entry with the corresponding image name.
 */
function addVacation(name, description, startDate, endDate, price, extension, callback)
{
    console.log("Add vacation extension: ", extension);
    let insertQ = `INSERT INTO vacations (name, description, startDate, endDate, price) 
    VALUES (?, ?, ?, ?, ?)`;
    con.execute(insertQ, [name, description, startDate, endDate, price], (err, res) => {
        if(err)
        {
            console.log("Error: ", err.message);
        }
        else
        {
            console.log("Result: ", res);
            console.log("Last id:" + res.insertId);
            let insertId = res.insertId;
            console.log("Final image name: ", "'" + name + insertId + extension + "'");

            let updateQ = `UPDATE vacations SET imageName = "${name}${insertId}${extension}" WHERE vacID = ${insertId}`
            con.execute(updateQ, (innerErr, innerRes) => {
                console.log("hey")
                if(innerErr)
                {
                    console.log("Error: ", innerErr.message);
                }
                else
                {
                    console.log("Updated: ", innerRes);
                    console.log("Image name: '" + name + insertId + "'");
                    callback(name + insertId); //Callback with the name of the image to save
                }
            });
        }


    });

}

async function editVacation(name, description, startDate, endDate, price, vacID, newImageName)
{
    let editQuery = `UPDATE vacations SET name = "${name}", description = "${description}", startDate = "${startDate}", endDate = "${endDate}", price = ${price}`;
    if(newImageName)
    {
        editQuery += `, imageName = "${newImageName}"`;
    }
    editQuery += ` WHERE vacID = ${vacID}`
    let result = await asyncQuery(editQuery);
    return result;
                
}


function getFavorites(userId)
{
    return new Promise(resolve => {

        con.query(`SELECT vacID FROM favorites WHERE userId = ${userId}`, (err, result) => {
            if(err)
            {
                console.log("error getting favorites: ", err.message);
                resolve();
            }
            else
            {
                resolve(result);
            }
            
        });
    });
    
}

function toggleFavorite(vacId, userId)
{
    return new Promise(function(resolve, reject) {

        let selectQuery = `SELECT * FROM favorites WHERE userId = ${userId} AND vacId = ${vacId};`;
        con.query(selectQuery, (err, results) => {
            if(err)
            {
                console.log("error toggle favorite: ", err.message);
                resolve({ok: false});

            }
            else
            {
                console.log("Results: ", results)
                if(results.length == 0)
                {
                    let insertQuery = `INSERT INTO favorites (userID, vacID) VALUES (${userId},${vacId});`
                    con.query(insertQuery, (insertErr, insertResults) => {
                        if(insertErr)
                        {
                            console.log("Error inserting favorite: ", insertErr.message);
                            resolve({ok:false});

                        }
                        else
                        {
                            resolve({ok:true});
                            console.log("Inserted favorite: (vacID: " + vacId + ", userID: " + userId + ")");
                        }

                    });
                }
                else
                {
                    let deleteQuery = `DELETE FROM favorites WHERE userID = ${userId} && vacID = ${vacId}`;
                    con.query(deleteQuery, (deleteErr, deleteResults) => { 
                        if(deleteErr)
                        {
                            resolve({ok:false});

                            console.log("Error deleting: ", deleteErr.message)
                        }

                        console.log("deleted favorite: (vacid" + vacId + ", userID:" + userId);
                        resolve({ok: true});
                    })
                }
            }
        }); 
    });
}

function getVacations(callback)
{
    let query = 'SELECT * FROM vacations'; 
    con.query(query, (err, res) => {
        if(err)
        {
            console.log("Error getting Vacations: ", err.message);
        }
        callback(res);
    })
}

async function getLastID(table)
{
    let query = `SELECT LAST_INSERT_ID() FROM vacations`;
    con.query(query, (err, res) => {
        console.log("RESULT: " + res);
    })
}

async function deleteVacation(vacID)
{
    console.log("delete vacation " + vacID);
    let query = `DELETE FROM vacations WHERE vacID = ${vacID}`;
    let response = await asyncQuery(query);
    if(response.err)
    {
        return false;
    } else
    {
        return true;
    }
}

async function asyncQuery(query) //Very useful, added too late
{
    return new Promise(resolve => {
        con.query(query, (err, res) => {
            if(err)
            {
                console.log("Error async query: query('" + query + "'), Error: " + err.message);
            }
            resolve({err, res});
        });
    })
}

module.exports = con.promise();
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.dropTable = dropTable;
module.exports.authUser = authUser;
module.exports.query = query;
module.exports.getLastID = getLastID;
module.exports.addVacation = addVacation;
module.exports.getVacations = getVacations;
module.exports.toggleFavorite = toggleFavorite;
module.exports.getFavorites = getFavorites;
module.exports.deleteVacation = deleteVacation;
module.exports.editVacation = editVacation;