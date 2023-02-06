const express = require("express");
const cors = require("cors");
const db = require("./db.js");
const prom = require("./promisetest");

// db.addUser("test@email.com123123", "pass123", "testusername", "testname", "testlastname", (err) => {
//     if(err)
//        console.error("Error adding user");
//     else
//         console.log("User added" );
// })
console.log("Hey:");

db.getUsers(res => {
    // console.log("Res: ", res);
});

const app = express();
let users = [];


app.use(cors());
app.use(express.json());
app.all("/api", (req, res) => {
    
     console.log("thingy: ", req.body)
    //  console.log("data: ", Object.keys(req.query))

     res.send({ test: "hey", users, arr: ["test", "pass", "testusername", "testlastname"]});

});
// app.post("/api", (req, res) => {
    
     
//     res.send({ test: "hey", users});
// });
const PORT = process.env.PORT || 3001;
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));