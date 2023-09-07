import React, { useState } from "react";
import { Author } from "./Author";
import { color } from "../services/Color";
import { InputWithButton } from "../ui/InputText";
import { LeadGrid } from "../ui/Grid";
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Flex } from '@mantine/core';

type landingPageType = {
    getAuthor: (author: Author) => void,
    setStatus: (status: string) => void,
    logo: any
}

export const LandingPage = ({ getAuthor, setStatus, logo }: landingPageType) => {

    // const [name, setName] = useState<string>("");

    const handleClick = (name : string) => {
        
        const author = {
            name: name,
            avatar: "https://api.multiavatar.com/" + name + ".svg"
        }
        console.log(author);
        getAuthor(author);
        setStatus("Content");
    }


    const PRIMARY_COL_HEIGHT = rem(300);

    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

    return (
        // <div className="landingPage" style={{backgroundColor: color.c2}}>
        //     <p>Please enter your name here</p>
        //     <input className="barName"
        //         onChange = {(e)=> setName(e.target.value) }
        //     ></input>
        //     <button className="barButton" 
        //         onClick = {handleClick}
        // >Connect</button>
        // </div>
        <div className="landingPageContainer" 
            style= {{display: "flex", flexDirection:"row", gap:"1rem"}}
        
        >

            <div className="landingLogoDiv">

                <img src={logo} className="landingLogoImg" />
                <h1>Talktive Kat</h1>
            </div>

            <div className="landingInputDiv">
                <InputWithButton text={"name"} getName= {handleClick}/>
            </div>
        </div>
    )
}