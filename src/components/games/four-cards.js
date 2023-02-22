import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import StyledAvatar from "../customAvatar";
import Question from "../question";

// Composant
const FourCards = ({url, question, choices, socket, gameId, round}) => {
    const [answer, setAnswer] = useState('');
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
        <form onSubmit={handleSubmit} className="FourCards">
            <Grid container flexDirection='column' rowSpacing={1} justifyContent="flex-around" alignItems="center" paddingTop="50px">
                <Grid item xs={12}>
                    <Question url={url} round={round} question={question} description="Sélectionne le choix qui te correspond le mieux" />
                </Grid>
                <Grid item>
                    <Grid container rowSpacing={1} justifyContent="center" alignItems="center">
                        <Grid item xs={6} textAlign="center" maxWidth="250">
                            <div className="bigcard">
                                <div className={`card ${answer === choices[0].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[0].img})` }}
                                     onClick={(e)=>setAnswer(choices[0].text)}>
                                </div>
                                <p>{choices[0].text}</p>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="bigcard">
                                <div className={`card ${answer === choices[1].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[1].img})` }}
                                     onClick={(e)=>setAnswer(choices[1].text)}>
                                </div>
                                <p>{choices[1].text}</p>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="bigcard">
                                <div className={`card ${answer === choices[2].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[2].img})` }}
                                     onClick={(e)=>setAnswer(choices[2].text)}>
                                </div>
                                <p>{choices[2].text}</p>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div className="bigcard">
                                <div className={`card ${answer === choices[3].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[3].img})` }}
                                     onClick={(e)=>setAnswer(choices[3].text)}>
                                </div>
                                <p>{choices[3].text}</p>
                            </div>
                        </Grid>
                    </Grid>

                </Grid>

                <Grid item marginTop="auto">
                    <button type="submit" disabled={!answer}>Valider</button>
                    <p>{messageStatus}</p>
                </Grid>

            </Grid>
        </form>
    );
};

export default FourCards;