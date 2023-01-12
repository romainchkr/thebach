import React, {useEffect, useState} from "react";

// Composant
const Eliminate = ({data, socket, nbToEliminate}) => {
    const [answer, setAnswer] = useState([]);
    const [messageStatus, setMessageStatus] = useState("");

    useEffect( () => {
        console.log("wsh")
        console.log(data)
    })
    const handleSubmit = async (e) => {
        e.preventDefault();

        // with acknowledgement
        socket.emit("game_response", { 'response' : answer }, (response) => {
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
            <p>Eliminer {nbToEliminate} réponse</p>

            <p>{data.question}</p>

            <div className="wrapCards">
                {data.responses.map((object, i) => (
                <div key={i} className={`answer ${answer.includes(object.id) ? "answer-active" : ""}`} onClick={(e)=> {
                    if(nbToEliminate === '1') {
                        setAnswer([object.id]);
                    } else {
                        if(answer.length === nbToEliminate)
                            setAnswer(answer.slice(1, answer.length));
                        setAnswer([...answer, object.id]);
                    }
                }}>
                    <p>{!object.answer ? "Pas de réponse" : object.answer}</p>
                </div>
            ))}
            </div>


            <button type="submit">Valider</button>
            <p>{messageStatus}</p>
        </form>
    );
};

export default Eliminate;