import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import Question from "../question";

// Composant
const Sentence = ({url, question, socket, gameId, round}) => {
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
    <form onSubmit={handleSubmit} className="sentence">
        <Grid container flexDirection='column' rowSpacing={1} justifyContent="flex-around" alignItems="center" paddingTop="50px">
            <Grid item xs={12}>
                <Question url={url} round={round} question={question} description="" />
            </Grid>
            <Grid item>
                <textarea id="story" name="answer" rows={4} cols={40}
                          value={answer}
                          onChange={(e) => setAnswer(e.target.value)}>
                </textarea>
            </Grid>

            <Grid item marginTop="auto">
                <button type="submit" disabled={!answer}>Valider</button>
                <p>{messageStatus}</p>
            </Grid>

        </Grid>
    </form>
    );
};

export default Sentence;