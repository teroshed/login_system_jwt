import axios from 'axios';
import cookies from './cookies';
// import 

async function verifyToken(callback)
{

    let token = cookies.getCookie ("token");
    console.log("checklogged: '" + token + "'");
    if(!token)
    {
        console.log("No token");
        return;
    }
    let ans = await axios.post("http://localhost:3001/checklogin", {token});
    callback && callback(ans.data);
    
}

async function logIn({username, password}, callback)
{

    let token = cookies.getCookie ("token");
    console.log("checklogged: '" + token + "'");
    if(!token)
    {
        console.log("No token");
        return;
    }
    let ans = await axios.post("http://localhost:3001/checklogin", {token});
    callback && callback(ans.data);
    
}

module.exports.logIn = logIn;

module.exports.verifyToken = verifyToken;