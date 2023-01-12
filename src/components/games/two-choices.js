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
        <form onSubmit={handleSubmit}>
            <div style={{textAlign: 'center'}}>
                <p >{question}</p>
                <p style={{fontSize: '1.1em', cursor: 'pointer'}}
                onClick={() => setAnswer(choice1)}
                className={answer === choice1 ? "twoChoicesActive" : ""}>{choice1}</p>
                <p>Ou</p>
                <p style={{fontSize: '1.1em', cursor: 'pointer'}}
                   onClick={() => setAnswer(choice2)}
                   className={answer === choice2 ? "twoChoicesActive" : ""}>{choice2}</p>
            </div>

            <button type="submit">Valider</button>
            <p>{messageStatus}</p>
        </form>
    );
};

export default TwoChoices;