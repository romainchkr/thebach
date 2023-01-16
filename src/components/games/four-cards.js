import React, {useEffect, useState} from "react";

// Composant
const FourCards = ({question, choices, socket, gameId}) => {
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
        <div className="FourCards">
            <form onSubmit={handleSubmit}>
                <p className="title">{question}</p>
                <div className="line" >
                    <div className="bigcard">
                        <div className={`card ${answer === choices[0].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[0].img})` }}
                             onClick={(e)=>setAnswer(choices[0].text)}>
                        </div>
                        <p>{choices[0].text}</p>
                    </div>


                    <div className="bigcard">
                        <div className={`card ${answer === choices[1].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[1].img})` }}
                             onClick={(e)=>setAnswer(choices[1].text)}>
                        </div>
                        <p>{choices[1].text}</p>
                    </div>

                </div>

                <div className="line">
                    <div className="bigcard">
                        <div className={`card ${answer === choices[2].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[2].img})` }}
                             onClick={(e)=>setAnswer(choices[2].text)}>
                        </div>
                        <p>{choices[2].text}</p>
                    </div>


                    <div className="bigcard">
                        <div className={`card ${answer === choices[3].text ? "cardActive" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${choices[3].img})` }}
                             onClick={(e)=>setAnswer(choices[3].text)}>
                        </div>
                        <p>{choices[3].text}</p>
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

export default FourCards;