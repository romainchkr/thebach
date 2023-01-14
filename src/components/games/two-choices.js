import React, {useEffect, useState} from "react";

// Composant
const TwoChoices = ({question, choice1, choice2, socket, gameId}) => {
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
        <div className="twoChoices">
            <form onSubmit={handleSubmit}>
                <div style={{textAlign: 'center'}}>
                    <p className="title">{question}</p>
                    <div className="choices">
                        <div onClick={() => setAnswer(choice1)}
                           className={answer === choice1 ? "twoChoicesActive" : ""}>{choice1}</div>
                        <p>Ou</p>
                        <div onClick={() => setAnswer(choice2)}
                           className={answer === choice2 ? "twoChoicesActive" : ""}>{choice2}</div>
                    </div>

                </div>

                <div className="buttonHolder">
                    <button type="submit">Valider</button>
                    <p>{messageStatus}</p>
                </div>
            </form>
        </div>

    );
};

export default TwoChoices;