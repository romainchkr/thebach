import React, {useEffect, useState} from "react";
import StyledAvatar from "../customAvatar";
import {Grid} from "@mui/material";

// Composant
const Visualise = ({bachelor, contenders, eliminated}) => {
    let angle = 360-90, dangle = 360 / (contenders.length);
    let distance = 350;

    useEffect(() => {
       console.log(eliminated)
    }, []);

    return (
        <Grid container flexDirection="column">
            <Grid item textAlign="center"  color="white" marginTop="25px">
                <h3>{eliminated === undefined ? `${bachelor.name} élimine quelqu'un !` : `${eliminated.name} à été éliminé !`}</h3>
            </Grid>

            <Grid item sx={{height: '80vh'}} marginTop="150px">
                <div className="bigcircle">
                    <div className="bachelor" >
                        <div>
                            <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${bachelor.url}`} sx={{ width: 150, height: 150 }}/>
                            <p style={{textAlign:'center'}}>{bachelor.name}</p>
                        </div>
                    </div>

                    { contenders.map((user, i) => (
                        <div key={i}
                             className="contender avatar"
                             style={{ transform: `rotate(${angle+(i*dangle)}deg) translate(${distance / 2}px) rotate(-${angle}deg)`, transition: 'transform .8s ease-in-out'}}>
                            <div style={{ transform: `rotate(-${angle+(i*dangle)}deg) rotate(${angle}deg)`}}>
                                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${user.url}`} sx={{ width: 100, height: 100 }}/>
                                <p style={{textAlign:'center'}}>{user.name}</p>
                            </div>
                        </div>
                    ))}
                    <div className="sonar-wave"></div>
                </div>
            </Grid>
        </Grid>
    );
};

export default Visualise;