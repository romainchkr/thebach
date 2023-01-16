import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';

import Game from "./pages/game";
import Home from "./pages/home";

//const socket = io.connect('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] }); // Add this -- our server will run on port 3001, so we connect to it from here
const socket = io.connect(`${process.env.REACT_APP_API_URL}`, { transports: ['websocket', 'polling', 'flashsocket'] });

function App() {
    const [name, setName] = useState('');
    const [sexe, setSexe] = useState('Male');
    const [room, setRoom] = useState('');
    const [socketId, setSocketId] = useState(null);

    useEffect(() => {
        // Se connecter au serveur et récupérer l'identifiant de socket

        fetch(`${process.env.REACT_APP_API_URL}/fetchId`)
            .then(res => res.json())
            .then(id => {
                setSocketId(id);
            });
    }, []);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home
                    name={name}
                    setName={setName}
                    sexe={sexe}
                    setSexe={setSexe}
                    room={room}
                    setRoom={setRoom}
                    socketId={socketId}
                    socket={socket}
                />} />
                <Route path='/game' element={<Game
                    name={name}
                    sexe={sexe}
                    room={room}
                    socketId={socketId}
                    socket={socket}
                />} />
            </Routes>
        </Router>
    );
}


export default App;
