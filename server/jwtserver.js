const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const multer = require("multer");
var path = require('path')

// const upload = multer({dest: '/images'});
const expressjwt = require("express-jwt");
// var busboy = require('connect-busboy'); 
const cookieParser = require("cookie-parser");


const db = require("./db.js");  
const secret = "secretsecretsecretsecret"


// or ES6

// import { expressjwt, ExpressJwtRequest } from "express-jwt";
const app = express();
app.use(cors({origin: "http://localhost:3000"}))    ;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))


function generateAccessToken(tokenData, expireIn = 1800) {
    
    let exp = new Date().getTime() + expireIn*1000 ;
    if(expireIn == 0)
        exp = 0;
    return jwt.sign({tokenData, exp}, secret);
  }

app.post("/login", (req, res) => {
    // db.addUser("email@email.com", "pass", "dani", "daniel", "terosh");
    console.log("req: ", req.body);
    db.authUser(req.body.email, req.body.password, result => {
        console.log("Auth: ", result);
        if(result.ok)
        {
            if(result.data != null && result.data.length > 0)
            {
                let token = generateAccessToken({name: req.body.name, last_name: req.body.last_name});
                res.send({success: true, token});
            }
            else
            {
                res.send({success: false, code: 401, message: "Login and password don't match"});
            }
        }
        else
        {
            res.send(result);
        }

    });
});

app.post("/register", (req, res) => {
    console.log("Register: ", req.body);
    const searchQuery = `SELECT * FROM users WHERE email = "${req.body.email}"`;
    db.query(searchQuery, (err,result) => {
        if(err)
        {
            console.log("Error at checking on register for duplicates:", err);
            return res.send({ok: false, code: 0, message: "Unknown error"})

        }
        else 
        {
            if(result.length > 0)
            {
                return res.send({ok: false, code: 1, message: "User with that username or email already exists"})
            }
            else
            {
                db.addUser(req.body.email, req.body.password, req.body.name, req.body.lastname, (err, resp) => {
                    if(err)
                        return res.send({ok : false});
                    else 
                    {
                        return res.send({ok : true});

                    }
                });
            }
        }
    })


    
    

});


var storage = multer.diskStorage({

    destination: async function (req, file, cb) {
        // let ans = db.
        

        cb(null, 'public/images/')
    },
    filename: function (req, file, cb) {
        console.log("req: ", req.body);
        console.log("file: ", file);
        db.addVacation(
            req.body.name,
            req.body.description,
            req.body.startDate, 
            req.body.endDate, 
            req.body.price, 
            path.extname(file.originalname),
            (imageName) => { 
                cb(null, imageName + path.extname(file.originalname)) //Appending extension

            });
    }
  })
  
  var upload = multer({ storage: storage });


app.post('/addVacation', upload.single('image'), (req, res) => {
    console.log("addVacation..................")
    // let a = db.getLastID();
    // let a = db.addVacation(
    //     req.body.name,
    //     req.body.description,
    //     req.body.startDate, 
    //     req.body.endDate, 
    //     req.body.price, 
    //     (err, res) => { 

    //     });

    console.log("files: ", req.file);
    console.log("Req: ", req.body);
    res.send({ok: true});
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
        if(payload.exp < Date.now()) 
        {
            return res.send({ok: false, code: 401, message: "Expired Token"});
        }
        res.send({ok: true});

    } catch(e)
    {
        console.log(e.message);
        return res.send({ok: false});

    }
    // res.send("aha");
    // res.send({"success" : true, username: payload.username});
    

});

app.get('/getvacations', (req, res) => {
    db.getVacations(result => {
        res.send(result);
    });

});

    // app.get("/protected", 
    // expressjwt({ secret: secret, algorithms: ["HS256"] }),
    // function (req, res) {
    //     console.log("Req: " + req.url);
    // }
    // );



const PORT = process.env.PORT || 3001;
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));