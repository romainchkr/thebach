import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Question from "../question";

// Composant
const TwoChoices = ({question, choice1, choice2, socket, gameId, round}) => {
    const [answer, setAnswer] = useState("");
    const [messageStatus, setMessageStatus] = useState("");

    useEffect(() => {
        setAnswer("");
        setMessageStatus("");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // with acknowledgement
        socket.emit("game_response", { gameId, answer }, (response) => {
            console.log(response)
            if(response.status) {
                setMessageStatus('Réponse enregistrée');

            } else {
                setMessageStatus("Erreur");
            }
        });
    }

    return (
        <form onSubmit={handleSubmit} className="twoChoices">
            <Grid container flexDirection='column' rowSpacing={1} justifyContent="flex-around" alignItems="center" paddingTop="50px" maxWidth="500px" height="100vh" margin="auto">
                <Grid item>
                    <Question round={round} question={question} description="" />
                </Grid>
                <Grid item width="80%" textAlign="center" className="choice" marginTop="50px">
                    <p onClick={() => setAnswer(choice1)}
                         className={answer === choice1 ? "twoChoicesActive" : ""}>{choice1}</p>
                </Grid>

                <Grid item>
                    <p>Ou</p>
                </Grid>

                <Grid item width="80%" textAlign="center" className="choice">
                    <p onClick={() => setAnswer(choice2)}
                         className={answer === choice2 ? "twoChoicesActive" : ""}>{choice2}</p>
                </Grid>


                <Grid item marginTop="auto">
                    <button type="submit" disabled={!answer}>Valider</button>
                    <p>{messageStatus}</p>
                </Grid>

            </Grid>
        </form>

    );
};

export default TwoChoices;