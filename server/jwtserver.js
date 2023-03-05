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


function generateAccessToken(username, expireIn = 1800) {
    
    let exp = new Date().getTime() + expireIn*1000 ;
    if(expireIn == 0)
        exp = 0;
    return jwt.sign({username, exp}, secret);
  }

app.use(cors({origin: "http://localhost:3000"}))    ;
app.use(express.json());
app.use(cookieParser());

app.post("/login", (req, res) => {
    // db.addUser("email@email.com", "pass", "dani", "daniel", "terosh");
    db.authUser(req.body.username, req.body.password, result => {
        console.log("Auth: ", result);
        if(result != null && result.length > 0)
        {
            let token = generateAccessToken(req.body.username);
            res.send({success: true, token});
        }
        else
        {
            res.send({success: false});
        }
    });
});

app.post("/register", (req, res) => {
    console.log("Register: ", req.body);
    const searchQuery = `SELECT * FROM users WHERE username = "${req.body.username}" OR email = "${req.body.email}"`;
    db.query(searchQuery, (err,result) => {
        console.log("here");
        if(err)
        {
            console.log("Error at checking on register for duplicates:", err);
            return res.send({ok: false, code: 0, message: "Unknown error"})

        }
        else 
        {
            if(result.length > 0)
            {
                console.log("Already exists user");
                return res.send({ok: false, code: 1, message: "User with that username already exists"})
            }
            else
            {
                db.addUser(req.body.email, req.body.password, req.body.username, req.body.name, req.body.lastname, (err, resp) => {
                    if(err)
                        res.send({ok : false});
                    else 
                    {
                        res.send({ok : true});

                    }
                });
                return res.send({ok: true})
            }
        }
    })


    
    

});

app.post('/verifyToken', (req, res) => {
    let token = req.body.token; 
    if(token == null)
    {
        return res.send({"success" : false});
    }
    try
    {
        let payload = jwt.verify(token, secret);    
        res.send({ok: true});

    } catch(e)
    {
        console.log(e.message);
        return res.send({ok: false});

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