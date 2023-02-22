import React, {useEffect, useState} from "react";
import {Grid} from "@mui/material";
import StyledAvatar from "../customAvatar";

// Composant
const WinnerChat = ({data, socket}) => {
    const [messagesReceived, setMessagesReceived] = useState([]);
    const [message, setMessage] = useState("");

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log("receive")
            console.log(data)
            setMessagesReceived([...messagesReceived, data])
        });
    }, [socket, messagesReceived]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message !== '') {
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            console.log("send")
            console.log(message)
            socket.emit('send_message', { message });
            setMessage('');
        }
    };

    return (
        <form onSubmit={sendMessage} className="chat">
            <div style={{textAlign: "center"}}>
                <h3 style={{color: "white", paddingTop: "25px"}}>Chat with {data.bachelor.name}</h3>
                <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${data.bachelor.url}`} sx={{ width: 75, height: 75}}/>
            </div>

            <div className="messagesColumn">
                {Object.values(data.data.responses).map((response, i) => (
                    <div className="game" key={i}>
                        <p>{response.question}</p>
                        <p className="gameAnswer">{response.answer}</p>
                    </div>
                ))}

                {messagesReceived.map((msg, i) => (
                    <div className={`message ${msg.from.socketId === socket.id ? "me" : "other"}`} key={i}>
                        <p className="msgText">{msg.message}</p>
                    </div>
                ))}
            </div>

            <div className="sendMessageContainer">
                <input
                    type="text"
                    placeholder='Message...'
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                />
                <button type="submit" disabled={!message}>Envoyer</button>
            </div>
        </form>
    );
};

export default WinnerChat;