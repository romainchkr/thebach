import React, {useEffect, useState} from "react";

// Composant
const Eliminate = ({data, socket, nbToEliminate}) => {
    const [answer, setAnswer] = useState([]);
    const [messageStatus, setMessageStatus] = useState("");

    useEffect( () => {
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
        <div className="Eliminate">
            <form onSubmit={handleSubmit}>
                <p className="title">Eliminer {nbToEliminate} réponse(s)</p>

                <p className="title">{data.question}</p>

                <div className="wrapCards">
                    {data.responses.map((object, i) => (
                        <div key={i} className={`answer ${answer.includes(object.id) ? "answer-active" : ""}`} onClick={(e)=> {
                            console.log(answer)
                            if(answer.includes(object.id)) {
                                setAnswer(answer.splice(answer.indexOf(object.id), 1));
                                return;
                            }

                            if(nbToEliminate === '1') {
                                setAnswer([object.id]);
                            } else {
                                if(answer.length >= nbToEliminate) {
                                    setAnswer(answer.shift());
                                    console.log(answer)
                                }
                                setAnswer([...answer, object.id]);
                            }

                            console.log(answer)
                        }}>
                            <p>{!object.answer ? "Pas de réponse" : object.answer}</p>
                        </div>
                    ))}
                </div>


                <div className="buttonHolder">
                    <button type="submit">Valider</button>
                    <p>{messageStatus}</p>
                </div>
            </form>
        </div>
    );
};

export default Eliminate;