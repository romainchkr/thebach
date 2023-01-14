import React, {useEffect, useState} from "react";

// Composant
const Sentence = ({question, socket, gameId}) => {
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
        <div className="sentence">
            <form onSubmit={handleSubmit}>
                <p className="title">{question}</p>
                <input
                    type="text"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />

                <div className="buttonHolder">
                    <button type="submit">Valider</button>
                    <p>{messageStatus}</p>
                </div>
            </form>
        </div>
    );
};

export default Sentence;