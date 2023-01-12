import React, {useEffect, useState} from "react";

// Composant
const WinnerChat = ({data, socket}) => {
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
        <form onSubmit={handleSubmit}>
            <p>Chat with bachelor</p>
            <p>{messageStatus}</p>
        </form>
    );
};

export default WinnerChat;