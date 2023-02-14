import React, {useState, useEffect} from 'react'

function WelcomePage() {

    function getCookie(key)
    {
        console.log("getting cookie: " + key);
        let cookies = document.cookie;
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

    useEffect(() => {   
        console.log("Cookies: ", document.cookie);
    })
  return (
    <div>WelcomePage</div>
  )
}

export default WelcomePage