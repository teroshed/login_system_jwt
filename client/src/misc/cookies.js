function getCookie(key)
{
    let cookies = document.cookie;
    if(key == null || key.replaceAll(" ", "") == "")
        return document.cookie;
    let cookiesArr = cookies.split("; ");
    for(const e of cookiesArr)
    {
        let cookie = e.split("=");
        let ckey = cookie[0];
        let value = cookie[1];
        if(ckey == key)
            return value;
    }

    return null;
}

function setCookie(key, value, expiresInSeconds)
{
    let str =`${key}=${value};`;
    if(expiresInSeconds)
        str += `max-age=${expiresInSeconds}`;
    document.cookie = str;
}


module.exports.get = getCookie;
module.exports.set = setCookie;