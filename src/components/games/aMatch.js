import React, {useEffect, useState} from "react";
import StyledAvatar from "../customAvatar";
import {Grid} from "@mui/material";
import {ReactComponent as StartSvg} from "../../assets/star.svg";

// Composant
const AMactch = ({data, replay}) => {
    let url = "";
    return (
        <Grid container flexDirection="column" rowSpacing={7}>
            <Grid item textAlign="center"  color="white" marginTop="25px">
                <h3>Félicitation!</h3>
            </Grid>

            <Grid item textAlign="center"  color="white">
                <h3>Vous avez matché avec XXX</h3>
            </Grid>

            <Grid item container flexDirection="row" justifyContent="center" position='relative'>
                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${url}`} sx={{ width: 100, height: 100 }}/>
                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${url}`} sx={{ width: 100, height: 100 }}/>
                <StartSvg style={{position: 'absolute', width: "50px", top: "45%"}}/>
            </Grid>

            <Grid item textAlign="center">
                <p><button type="submit" onClick={replay}>Rejouer</button></p>
                <p><button type="submit" disabled>Discuter</button></p>
            </Grid>


        </Grid>
    );
};

export default AMactch;