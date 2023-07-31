import React, { useState } from "react";
import { Author } from "./Author";
import { color } from "../services/Color";

type landingPageType = {
    getAuthor : (author : Author) => void,
    setStatus : (status : string) => void
}

export const LandingPage = ( {getAuthor, setStatus} : landingPageType ) => {

    const [name,setName] = useState<string>("");

    const handleClick = () => {

        const author = {
            name : name,
            avatar : "https://api.multiavatar.com/"+name+".svg"
        }
        getAuthor(author);
        setStatus("Content");
    }

    return (
        <div className="landingPage" style={{backgroundColor: color.c2}}>
            <p>Please enter your name here</p>
            <input className="barName"
                onChange = {(e)=> setName(e.target.value) }
            ></input>
            <button className="barButton" 
                onClick = {handleClick}
            >Connect</button>
        </div>
    )
}