import React from "react";
import {Grid} from "@mui/material";
import StyledAvatar from "./customAvatar";

const Question = ({round, question, url, description}) => {
    return (
        <Grid container flexDirection="column" margin="auto">
            <Grid item xs={12} textAlign="center" padding="5px">
                <p style={{fontWeight: "bold"}}>Tour {round}</p>
            </Grid>

            <Grid item xs={12} container flexDirection="row" justifyContent="space-between" flexWrap="nowrap">
                <Grid item alignSelf="center">
                    <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${url}`} sx={{ width: 75, height: 75 }}></StyledAvatar>
                </Grid>
                <Grid item minWidth="150px" container flexDirection="column">
                    <Grid item>
                        <h3 className="question">{question}</h3>
                    </Grid>

                    <Grid item paddingTop="5px">
                        <p style={{color: "#e5e5e5"}}>{description}</p>
                    </Grid>
                </Grid>
            </Grid>


        </Grid>
    );
}

export default Question