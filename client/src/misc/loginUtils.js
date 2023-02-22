import axios from 'axios';
import cookies from './cookies';
// import 

export async function verifyToken(callback)
{

    let token = cookies.getCookie ("token");
    console.log("checklogged: '" + token + "'");
    if(!token)
    {
        console.log("No token");
        return;
    }
    let ans = await axios.post("http://localhost:3001/verifyToken", {token});
    callback && callback(ans.data);
    
}

export async function logIn({username, password}, callback)
{

    let ans = await axios.post("http://localhost:3001/login", {username, password});
    callback && callback(ans.data);
    
}
