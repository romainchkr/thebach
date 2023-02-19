import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import io from 'socket.io-client';

import Game from "./pages/game";
import Home from "./pages/home";
import {createTheme} from "@mui/material";

//const socket = io.connect('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] }); // Add this -- our server will run on port 3001, so we connect to it from here
const socket = io.connect(`${process.env.REACT_APP_API_URL}`, { transports: ['websocket', 'polling', 'flashsocket'] });

export const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 400,
            md: 900,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        primary: {
            main: '#212121',
        },
        secondary: {
            main: '#EC77AB',
        },
    },
});

function App() {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [socketId, setSocketId] = useState(null);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home
                    name={name}
                    setName={setName}
                    room={room}
                    setRoom={setRoom}
                    socketId={socketId}
                    socket={socket}
                />} />
                <Route path='/game' element={<Game
                    name={name}
                    room={room}
                    socketId={socketId}
                    socket={socket}
                />} />
            </Routes>
        </Router>
    );
}


export default App;
