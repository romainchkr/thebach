import React, {useEffect, useState} from "react";

// Composant
const TwoChats = ({data, socket}) => {
    const [messageStatus, setMessageStatus] = useState("");

    useEffect(() => {
        console.log(data)
    })

    const handleSubmit = async (e) => {
        e.preventDefault();

        // with acknowledgement
        /*socket.emit("game_response", { 'response' : answer }, (response) => {
            console.log(response)
            if(response.status) {
                setMessageStatus('Réponse enregistrée');

            } else {
                setMessageStatus("Erreur");
            }
        });*/
    }

    return (
        <div className="two-chats">
            <form onSubmit={handleSubmit}>
                <p>Chat 1</p>
                <p>{messageStatus}</p>
            </form>

            <form onSubmit={handleSubmit}>
                <p>Chat 2</p>
                <p>{messageStatus}</p>
            </form>
        </div>

    );
};

export default TwoChats;