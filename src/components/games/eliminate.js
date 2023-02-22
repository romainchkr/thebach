import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import StyledAvatar from "../customAvatar";

// Composant
const Eliminate = ({data, socket, canEliminate}) => {
    const [answer, setAnswer] = useState('');
    const [messageStatus, setMessageStatus] = useState("");

    useEffect( () => {
        console.log(data)
        console.log(canEliminate)
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        // with acknowledgement
        socket.emit("game_response", { 'socketIdToDelete' : answer }, (response) => {
            console.log(response)
            if(response.status) {
                setMessageStatus('Réponse enregistrée');

            } else {
                setMessageStatus("Erreur");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="eliminate">
            <Grid container flexDirection='column' rowSpacing={3} justifyContent="flex-around" alignItems="center" maxWidth="500px" margin="auto">
                <Grid item color="white" textAlign="center">
                    <h3>{data.question}</h3>
                    <p>Touche pour éliminer</p>
                </Grid>

                {data.responses.map((object, i) => (
                    <Grid padding="2%" item container key={i} className={`answer ${answer === object.id ? "answer-active" : ""}`}
                          onClick={(e)=> {
                              setAnswer(object.id);
                              console.log(answer);
                              console.log("----")
                          }}
                    >
                        <Grid item xs={4} container flexDirection="column" alignItems="center">
                            <div>
                                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${object.url}`} sx={{ width: 75, height: 75 }}/>
                            </div>
                            <div style={{textAlign:'center'}}>{object.name}</div>
                        </Grid>

                        <Grid item xs={8}>
                            <p className="response">{!object.answer ? "Pas de réponse" : object.answer.answer}</p>
                        </Grid>

                    </Grid>
                ))}



                <Grid item marginTop="auto">
                    <button type="submit" disabled={!answer || !canEliminate}>Eliminer</button>
                    <p>{messageStatus}</p>
                </Grid>

            </Grid>
        </form>
    );
};

export default Eliminate;