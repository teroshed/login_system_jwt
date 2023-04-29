import axios from 'axios';
import cookies from './cookies';
// import 

export async function verifyToken(callback)
{

    let token = cookies.getCookie("token");
    if(!token)
    {
        console.log("No token");
        return;
    }
    if(token.exp < Date.now())
    {
        cookies.deleteCookie('token');
    }
    let ans = await axios.post("http://localhost:3001/verifyToken", {token});
    callback && callback(ans.data);
    
}

export async function logIn({email, password}, callback)
{

    let ans = await axios.post("http://localhost:3001/login", {email, password});
    callback && callback(ans.data);
    
}
