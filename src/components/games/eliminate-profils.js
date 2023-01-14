import React, {useState} from "react";

// Composant
const EliminateProfils = ({data, socket}) => {
    const [answer, setAnswer] = useState([]);
    const [messageStatus, setMessageStatus] = useState("");

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
        <div className="EliminateProfils">
            <form onSubmit={handleSubmit}>
                <p className="title">Eliminer 1 profil</p>

                <div className="wrapCards">
                    {Object.keys(data.contenders).map((key, i) => (
                        <div>
                            <div key={key} className={`face-card ${answer[0] === key ? "face-card-active" : ""}`} style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}/${data.contenders[key].image})` }}
                                 onClick={(e)=>{
                                     console.log("click")
                                     setAnswer([key])
                                     console.log(answer)
                                 }}>
                            </div>
                            <p style={{textAlign:'center'}}>{data.contenders[key].name}</p>
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

export default EliminateProfils;