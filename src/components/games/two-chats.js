import React, {useEffect, useState} from "react";
import WinnerChat from "./winner-chat";
import StyledAvatar from "../customAvatar";
import {Grid} from "@mui/material";

// Composant
const TwoChats = ({contenders, socket}) => {
    const [chatMessages1, setChatMessage1] = useState([]);
    const [chatMessages2, setChatMessage2] = useState([]);
    const [message1, setMessage1] = useState("");
    const [message2, setMessage2] = useState("");
    const [activeChat, setActiveChat] = useState(1);

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log("receive")
            console.log(data)
            if(data.to === Object.keys(contenders)[0] || data.from.socketId === Object.keys(contenders)[0]) {
                setChatMessage1([...chatMessages1, data])
            } else {
                setChatMessage2([...chatMessages2, data])
            }

        });
    }, [socket, chatMessages1, chatMessages2]);

    const sendMessage1 = (e) => {
        e.preventDefault();
        if (message1 !== '') {
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            console.log(contenders)
            socket.emit('send_message', { message: message1, to: Object.keys(contenders)[0]});
            setMessage1('');
        }
    };

    const sendMessage2 = (e) => {
        e.preventDefault();
        if (message2 !== '') {
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socket.emit('send_message', { message: message2, to: Object.keys(contenders)[1] });
            setMessage2('');
        }
    };

    return (
        <div className="two-chats">
            <Grid container justifyContent="center" flexDirection="row">
                <Grid item style={{textAlign: "center", cursor: "pointer", padding: "5px 15px", margin: "10px"}}
                onClick={() => setActiveChat(1)} className={`${activeChat === 1 ? "chatActiveUser" : ""}`}>
                    <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${contenders[Object.keys(contenders)[0]].url}`} sx={{ width: 60, height: 60}}/>
                    <h3 style={{color: "white"}}>{contenders[Object.keys(contenders)[0]].name}</h3>

                </Grid>

                <Grid item style={{textAlign: "center", cursor: "pointer", padding: "5px 15px", margin: "10px"}}
                      onClick={() => setActiveChat(2)} className={`${activeChat === 2 ? "chatActiveUser" : ""}`}>
                    <StyledAvatar src={`${process.env.REACT_APP_API_URL}/${contenders[Object.keys(contenders)[1]].url}`} sx={{ width: 60, height: 60}}/>
                    <h3 style={{color: "white"}}>{contenders[Object.keys(contenders)[1]].name}</h3>
                </Grid>
            </Grid>

            <form onSubmit={sendMessage1} className='chat' style={ activeChat === 1 ? {display: 'block'} : {display: 'none'}}>
                <div className="messagesColumn">
                    {Object.values(contenders[Object.keys(contenders)[0]].responses).map((response, i) => (
                        <div className="game" key={i}>
                            <p>{response.question}</p>
                            <p className="gameAnswer">{response.answer}</p>
                        </div>
                    ))}

                    {chatMessages1.map((msg, i) => (
                        <div className={`message ${msg.from.socketId === socket.id ? "me" : "other"}`} key={i}>
                            <p className="msgText">{msg.message}</p>
                        </div>
                    ))}
                </div>

                <div className="sendMessageContainer">
                    <input
                        type="text"
                        placeholder='Message...'
                        onChange={(e) => setMessage1(e.target.value)}
                        value={message1}
                    />
                    <button type="submit" disabled={!message1}>Envoyer</button>
                </div>
            </form>

            <form onSubmit={sendMessage2} className='chat' style={ activeChat === 2 ? {display: 'block'} : {display: 'none'}} >
                <div className="messagesColumn">
                    {Object.values(contenders[Object.keys(contenders)[1]].responses).map((response, i) => (
                        <div className="game" key={i}>
                            <p>{response.question}</p>
                            <p className="gameAnswer">{response.answer}</p>
                        </div>
                    ))}

                    {chatMessages2.map((msg, i) => (
                        <div className={`message ${msg.from.socketId === socket.id ? "me" : "other"}`} key={i}>
                            <p className="msgText">{msg.message}</p>
                        </div>
                    ))}
                </div>

                <div className="sendMessageContainer">
                    <input
                        type="text"
                        placeholder='Message...'
                        onChange={(e) => setMessage2(e.target.value)}
                        value={message2}
                    />
                    <button type="submit" disabled={!message2}>Envoyer</button>
                </div>
            </form>
        </div>

    );
};

export default TwoChats;