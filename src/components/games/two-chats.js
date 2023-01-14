import React, {useEffect, useState} from "react";
import WinnerChat from "./winner-chat";

// Composant
const TwoChats = ({data, socket}) => {
    const [messagesRecieved, setMessagesReceived] = useState([]);
    const [message, setMessage] = useState("");

    // Runs whenever a socket event is recieved from the server
    useEffect(() => {
        socket.on('receive_message', (data) => {
            console.log(data);
            setMessagesReceived((state) => [
                ...state,
                {
                    message: data.message,
                    username: data.username,
                },
            ]);
        });

        // Remove event listener on component unmount
        return () => socket.off('receive_message');
    }, [socket]);

    const sendMessage = () => {
        if (message !== '') {
            // Send message to server. We can't specify who we send the message to from the frontend. We can only send to server. Server can then send message to rest of users in room
            socket.emit('send_message', { message });
            setMessage('');
        }
    };

    return (
        <div className="two-chats">
            <div className="chat">
                <p className="title">Chat with user1</p>

                <div className="messagesColumn">
                    {messagesRecieved.map((msg, i) => (
                        <div className="message" key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="msgMeta">{msg.username}</span>
                            </div>
                            <p className="msgText">{msg.message}</p>
                            <br />
                        </div>
                    ))}
                </div>

                <div className="sendMessageContainer">
                    <input
                        className="messageInput"
                        placeholder='Message...'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send Message
                    </button>
                </div>
            </div>

            <div className="chat">
                <p className="title">Chat with user2</p>

                <div className="messagesColumn">
                    {messagesRecieved.map((msg, i) => (
                        <div className="message" key={i}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <span className="msgMeta">{msg.username}</span>
                            </div>
                            <p className="msgText">{msg.message}</p>
                            <br />
                        </div>
                    ))}
                </div>

                <div className="sendMessageContainer">
                    <input
                        className="messageInput"
                        placeholder='Message...'
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                    />
                    <button type="submit" onClick={sendMessage}>
                        Send Message
                    </button>
                </div>
            </div>
        </div>

    );
};

export default TwoChats;