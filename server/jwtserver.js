const express = require("express");
const cors = require("cors");
const db = require("./db.js");  
const expressjwt = require("express-jwt");
const jwt = require("jsonwebtoken");
const secret = "secretsecretsecretsecret"
const cookieParser = require("cookie-parser");


// or ES6

// import { expressjwt, ExpressJwtRequest } from "express-jwt";
const app = express();


function generateAccessToken(username) {
    return jwt.sign({username}, secret, { expiresIn: "1800s" });
  }

app.use(cors({origin: "http://localhost:3000"}))    ;
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
    let ans;
    console.log("cookies ?", req.cookies);
    // db.addUser("email@email.com", "pass", "dani", "daniel", "terosh");
    db.authUser(req.body.username, req.body.password, result => {
        console.log("Auth: ", result);
        if(result != null && result.length > 0)
        {
            let token = generateAccessToken(req.body.username);
            res.send({success : true, token});
        }
        else
        {
            res.send({success : false});
        }
    });
});

app.post('/checklogin', (req, res) => {
    console.log('Checking');
    // res.send("hey");
    let token = req.body.token; 
    console.log("token: '" + token + "'");

    // console.log("token", token);
    if(token == null)
    {
        return  res.send({"success" : false});

    }
    let payload;
    try
    {
        payload = jwt.verify(token, secret);    
        res.send({"sucess": true, "username": payload.username});

    } catch(e)
    {
        console.log(e.message);
        console.log("error verifying token");
        return res.send({"success" :false});

    }
    // res.send("aha");
    // res.send({"success" : true, username: payload.username});
    

});

    // app.get("/protected", 
    // expressjwt({ secret: secret, algorithms: ["HS256"] }),
    // function (req, res) {
    //     console.log("Req: " + req.url);
    // }
    // );



const PORT = process.env.PORT || 3001;
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));