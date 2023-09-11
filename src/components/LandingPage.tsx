import React, { useState } from "react";
import { Author } from "./Author";
import { colorType } from "../services/Color";
import { InputWithButton } from "../ui/InputText";
import { LeadGrid } from "../ui/Grid";
import { Container, Grid, SimpleGrid, Skeleton, useMantineTheme, rem, Flex } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';

type landingPageType = {
    getAuthor: (author: Author) => void,
    setStatus: (status: string) => void,
    logo: any,
    color: {
        c1: string,
        c2: string,
        c3: string,
        c4: string,
    }
}

export const LandingPage = ({ getAuthor, setStatus, logo, color }: landingPageType) => {

    const handleClick = (name : string) => {
        
        const author = {
            name: name,
            avatar: "https://api.multiavatar.com/" + name + ".svg",
            id : uuidv4()
        }
        console.log(author);
        getAuthor(author);
        setStatus("Content");
    }


    const PRIMARY_COL_HEIGHT = rem(300);

    const theme = useMantineTheme();
    const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - ${theme.spacing.md} / 2)`;

    console.log(color);

    const style: React.CSSProperties = {
        // bakgroundColor: color.c1, 
        padding: "1rem"
    }

    return (
        <div className="landingPageContainer" 
            style= {{display: "flex", flexDirection:"row", gap:"1rem", justifyContent:"space-evenly"}}
        >
            <div className="landingLogoDiv" >
                <img src={logo} className="landingLogoImg" />
                <h1>Talktive Kat</h1>
            </div>

            <div className="landingInputDiv" 
                style = {{backgroundColor:"lightgray", borderRadius:"2rem"}}>
                <InputWithButton text={""} getName= {handleClick} placeholder={"name"}/>
                {/* custom input + buttom */}
            </div>
        </div>
    )
}