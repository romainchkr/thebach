import React from "react";
import {Grid} from "@mui/material";
import {useNavigate} from "react-router-dom";

// Composant
const Loser = ({name, socket, replay}) => {
    const navigate = useNavigate();

    return (
        <Grid container flexDirection="column" rowSpacing={10}>
            <Grid item textAlign="center"  color="white" marginTop="25px">
                <h3>Vous avez été éliminé !</h3>
            </Grid>

            <Grid item textAlign="center">
                <button type="submit" onClick={replay}>Rejouer</button>
            </Grid>
        </Grid>
    );
};

export default Loser;