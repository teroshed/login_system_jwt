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
    }
    else
    {
        console.log("Connected to database.");
        setDatabase();
    }

});

function setDatabase() {
    console.log("setDatabase");
    

    // addUser("email@gmail.com", "pass123", "username123", "name123", "last_name1");
    createTable(res => {
        
    });


}

function authUser(login, password, callback)
{
    // console.log(con);
    let query = `SELECT id, username, name, last_name FROM users WHERE (email = '${login}' OR username = '${login}') AND (password = '${password}')`;
    con.query(query, (err, result) => {
        if(err)
        {
            console.log("error auth: " + err.message);
            result = {success: false, code: 404, message: "Error connecting to database"};
        }
        // else
        // {
            callback && callback({ok: true, data: result});
        // }
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

async function createTable(callback)
{
    let query = `CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email varchar(128) NOT NULL UNIQUE, 
        password varchar(128) NOT NULL,
        username varchar(32) NOT NULL UNIQUE,
        name varchar(32),
        last_name varchar(32));
        `;
    
    con.execute(query, (err, res) => {
        if(err)
            console.error("Error createtable");
        else
        {
            console.log("Created table");
            callback && callback();
        }
    
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

function addUser(email, password, username, name, last_name, callback)
{
    let query = `INSERT INTO users (email, password, username, name, last_name) VALUES ("${email}", "${password}", "${username}", "${name}", "${last_name}")`;
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

module.exports = con.promise();
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.dropTable = dropTable;
module.exports.authUser = authUser;
module.exports.query = query;
module.exports.getLastID = getLastID;
module.exports.addVacation = addVacation;
module.exports.getVacations = getVacations;
