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
const fs = require("fs");
const secret = "secretsecretsecretsecret"


// or ES6

// import { expressjwt, ExpressJwtRequest } from "express-jwt";
const app = express();
app.use(cors({origin: "http://localhost:3000"}))    ;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'))


function generateAccessToken(tokenData, expireIn = 1800) {
    console.log("Token data: ", tokenData);
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
                let token = generateAccessToken({name: result.data[0].name, last_name: result.data[0].last_name, userId: result.data[0].userId, role: result.data[0].role} );
                res.send({success: true, token});
            }
            else
            {
                res.send({success: false, code: 401, message: "Login and password don't match"});
            }
        }
        else
        {
            console.log("Result: ", result);
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


//Add token check,
app.post('/toggleVacation', async (req, res) => { 
    let token = req.body.token;
    try{
        let decoded = jwt.verify(token, secret);
        let userId = decoded.tokenData.userId;
        let ans = await db.toggleFavorite(req.body.vacID, userId);
        res.send({ok: ans.ok});
        // console.log("Decoded: ", decoded);
    } catch(err)
    {
        console.log("Error verifying token: ", err.message);
        res.send({ok: false, code: 401, message: 'Invalid token'});
    }
    
    res.send();
})

app.post('/getFavorites', async (req, res) => {
    let token = req.body.token;
    try{
        let decoded = jwt.verify(token, secret);
        let userId = decoded.tokenData.userId;
        let result = await db.getFavorites(userId)
        let formattedFavs = [];
        for(let i = 0; i < result.length; i++) {
            formattedFavs[i] = result[i].vacID;
        }

        res.send(formattedFavs);
    } catch(err) {
        console.log("Error get favorites: ", err.message);
        res.send({ok: false, code: 401, message: "Invalid token"});
    };
    
});

app.get('/getvacations', (req, res) => {
    db.getVacations(result => {
        res.send(result);
    });


});

app.post('/deleteVacation', async (req, res) => { 
    try{
        jwt.verify(req.body.token, secret);
        let ok = await db.deleteVacation(req.body.vacID);
        deleteImage(req.body.imageName);
        res.send({ok});

    }
    catch(err)
    {
        console.log("error: ", err.message);
        res.send({ok: false, code: 401});
    }

});


var editStorage = multer.diskStorage({

    destination: async function (req, file, cb) {
        // let ans = db.
        // console.log("Image dest: ", file);
        cb(null, 'public/images/')
    },
    filename: async (req, file, cb) => {

        
        // console.log("reqaa: ", req.body);
        // console.log("image: ", file);
        // let result;

        let newName = req.body.name + req.body.vacId + path.extname(file.originalname);
        deleteImage(req.body.imageName);
        cb(null, newName);  


        result = await db.editVacation(
            req.body.name,
            req.body.description,
            req.body.startDate,
            req.body.endDate, 
            req.body.price,
            req.body.vacId,
            newName
        )
        

    }
});
  
var editUpload = multer({ storage: editStorage });


function renameImage(oldName, newName)
{
    fs.rename('./public/images/' + oldName, './public/images/' + newName, () => {
        
    });
}

function deleteImage(name)
{
    fs.unlink('./public/images/' + name, err => {
        if(err)
            console.log("Error deleting image: " + name);
        else
            console.log("Deleted image: " + name);
    })
}

app.post('/editVacation', editUpload.single('image'), async (req, res) => {

    if(!req.file)
    {
        let newName = req.body.name + req.body.vacId + path.extname(req.body.imageName);
        let oldName = req.body.imageName;
        renameImage(oldName, newName);

        let result = db.editVacation(
            req.body.name,
            req.body.description,
            req.body.startDate,
            req.body.endDate,
            req.body.price,
            req.body.vacId,
            newName
        )
        if(result.err)
        {
            console.log("error: ", result.err.message);
            res.send({ok: false});
        }
        else
        {
            res.send({ok: true});
        }
    }
    else
    {
    
        res.send({ok: true});
    }

    // console.log("Image: ", req.file); 

});





const PORT = process.env.PORT || 3001;
 
app.listen(PORT, console.log(`Server started on port ${PORT}`));