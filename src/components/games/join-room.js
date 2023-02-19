import React, {useEffect, useState} from "react";
import StyledAvatar from "../customAvatar";
import {Grid} from "@mui/material";

// Composant
const JoinRoom = ({users, timeout}) => {
    const [counter, setCounter] = useState(0);
    let angle = 360-90, dangle = 360 / (users.length-1);
    let distance = 350;
    useEffect(() => {
        setCounter(timeout);
        console.log(users)
    }, []);

    useEffect(() => {
        counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    }, [counter]);

    return (
        <Grid container flexDirection="column">

            <Grid item textAlign="center"  color="white" marginTop="25px">
                <h3>Vous avez trouvé un match ! A vous de jouer dans {counter}</h3>
            </Grid>

            <Grid item sx={{height: '80vh'}} marginTop="150px">
                <div className="bigcircle">
                    { users.map((user, i) => (
                        <div key={i}
                             className={`${user.isBachelor ? "bachelor" : "contender "} avatar`}
                             style={ !user.isBachelor ? { transform: `rotate(${angle+(i*dangle)}deg) translate(${distance / 2}px) rotate(-${angle}deg)`} : {}}>
                            <div style={ !user.isBachelor ? { transform: `rotate(-${angle+(i*dangle)}deg) rotate(${angle}deg)`} : {}}>
                                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${user.url}`} sx={ user.isBachelor ? { width: 150, height: 150 } : { width: 100, height: 100 }}/>
                                <p style={{textAlign:'center'}}>{user.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Grid>

        </Grid>
    );
};

export default JoinRoom;