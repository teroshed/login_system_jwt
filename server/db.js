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
    database: 'test'
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
    let query = `SELECT id, username, name, last_name FROM users WHERE (email = '${login}' OR username = '${login}') AND (password = '${password}')`;
    con.query(query, (err, result) => {
        if(err)
        {
            console.log("error auth: " + err.message);
        }
        else
        {
            callback && callback(result);
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
        if(err)
            console.error("Error adding user, ", err);
        else
        {
            console.log("Added user: ", res);
            if(callback)
                callback();
        }
    })
}


module.exports = con.promise();
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.dropTable = dropTable;
module.exports.authUser = authUser;
