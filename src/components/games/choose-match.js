import React, {useState} from "react";
import {Grid} from "@mui/material";
import StyledAvatar from "../customAvatar";

// Composant
const ChooseMatch = ({contenders, bachelor, socket}) => {
    const [matchingUser, setMatchingUser] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // with acknowledgement
        socket.emit("choose_match", { 'socketIdToKeep' : matchingUser });
    };


    return (
        <form onSubmit={handleSubmit}>
            <h3 style={{color: "white", textAlign: "center", paddingTop: "25px"}}>Choisissez le profil avec qui voulez continuer de discuter</h3>

            <div style={{textAlign: "center", padding: "5px 15px", margin: "10px"}}>
                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${bachelor.url}`} sx={{ width: 60, height: 60}}/>
                <h3 style={{color: "white"}}>{bachelor.name}</h3>
            </div>

            <Grid container justifyContent="center" flexDirection="row">
                <Grid item style={{textAlign: "center", cursor: "pointer", padding: "5px 15px", margin: "10px"}}
                      onClick={() => setMatchingUser(Object.keys(contenders)[0])} className={`${matchingUser === Object.keys(contenders)[0] ? "chatActiveUser" : ""}`}>
                    <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${contenders[Object.keys(contenders)[0]].url}`} sx={{ width: 60, height: 60}}/>
                    <h3 style={{color: "white"}}>{contenders[Object.keys(contenders)[0]].name}</h3>
                </Grid>

                <Grid item style={{textAlign: "center", cursor: "pointer", padding: "5px 15px", margin: "10px"}}
                      onClick={() => setMatchingUser(Object.keys(contenders)[1])} className={`${matchingUser === Object.keys(contenders)[1] ? "chatActiveUser" : ""}`}>
                    <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${contenders[Object.keys(contenders)[1]].url}`} sx={{ width: 60, height: 60}}/>
                    <h3 style={{color: "white"}}>{contenders[Object.keys(contenders)[1]].name}</h3>
                </Grid>
            </Grid>

            <div  style={{textAlign: "center"}}>
                <button type="submit" disabled={!matchingUser}>Match</button>
            </div>

        </form>

    );
};

export default ChooseMatch;