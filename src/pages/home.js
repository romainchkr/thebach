import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {Button, Grid, ThemeProvider} from "@mui/material";
import {theme} from "../App";

const Home = ({ socketId, socket, name, setName }) => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (name !== '') {
            navigate('/game', { replace: true });
        }
    }

    return (
        <ThemeProvider theme={theme}>
                <form onSubmit={handleSubmit} className="home" style={{margin: "auto", maxWidth: "500px", color: "white", textAlign:"center"}}>
                    <Grid container flexDirection='column' rowSpacing={6} justifyContent="center" alignItems="center" height="100vh" paddingTop="80px">
                        <Grid item>
                            <h1 style={{fontSize: "4em"}}>The One</h1>
                        </Grid>

                        <Grid item>
                            <input
                                placeholder="Nom"
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Grid>

                        <Grid item marginTop="auto">
                            <button type="submit" disabled={!name}>Jouer</button>
                        </Grid>
                    </Grid>
                </form>
        </ThemeProvider>
    );
};

export default Home;