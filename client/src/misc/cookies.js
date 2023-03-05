export function getCookie(key)
{
    let cookies = document.cookie;
    let cookiesArr = cookies.split("; ");
    let cookiesArrObject = [];

    for(const e of cookiesArr)
    {
        let cookie = e.split("=");
        let ckey = cookie[0];
        let value = cookie[1];
        cookiesArrObject.push({key: ckey, value});
        
    }
    if(key == null || key.replaceAll(" ", "") == "")
            return cookiesArrObject;
    let cookie = cookiesArrObject.find(cookie => cookie.key == key);
    if(cookie)
        return cookie.value;


    return null;
}

export function setCookie(key, value, expire)
{
    let str =`${key}=${value};`;
    if(expire)
        str += `expires=${expire}`;
    document.cookie = str;
}

export function clearCookies()
{
    
    // deleteCookie("testcookie");

    let cookies = getCookie();
    cookies.forEach(cookie => {
        deleteCookie(cookie.key);
    })
}

export function deleteCookie(cookie)
{
    
    document.cookie = cookie + "=a;max-age=0";
}

export default {getCookie, setCookie, clearCookies, deleteCookie};