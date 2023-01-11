import './App.css';

import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Routes, Route, useNavigate} from 'react-router-dom';
import io from 'socket.io-client';

import Game from "./pages/game";
import Home from "./pages/home";

/*function Form({ url }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [image, setImage] = useState(null);
    const [socketId, setSocketId] = useState(null);

    const nextScreen = () => {
        navigate("/game", {state:{socketId: socketId, name: name, url: url}});
    }

    useEffect(() => {
        // Se connecter au serveur et récupérer l'identifiant de socket
        const io = socketio('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });
        fetch(`http://localhost:3001/${url}`)
            .then(res => res.json())
            .then(id => {
                setSocketId(id);
                io.emit('connect-socket', id);
            });

        io.on('start', nextScreen);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Envoyer un POST à l'adresse '/ready' avec le nom, l'image et l'URL
        const response = await fetch('http://localhost:3001/ready', {
            method: 'POST',
            body: JSON.stringify({ socketId, name, image, url }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Nom :</label>
            <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label htmlFor="image">Image :</label>
            <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
            />
            <button type="submit">Ready</button>
        </form>
    );
}

function Admin() {
    const [readyCount, setReadyCount] = useState(0);

    useEffect(() => {
        // Se connecter au serveur via sockets
        const io = socketio('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] });

        // Mettre à jour le nombre d'utilisateurs prêts lorsque l'événement 'update-ready-count' est reçu
        io.on('update-ready-count', count => setReadyCount(count));

        // Récupérer le nombre d'utilisateurs prêts lorsque le composant est monté
        fetch('http://localhost:3001/ready-count')
            .then(res => res.json())
            .then(data => setReadyCount(data.count));
    }, []);

    async function handleStart() {
        const response = await fetch('http://localhost:3001/start');
    }

    async function handleReset() {
        const response = await fetch('http://localhost:3001/reset');
    }

    return (
        <div>
            <p>Nombre d'utilisateurs prêts : {readyCount}</p>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
        </div>
    );
}*/

const socket = io.connect('http://localhost:3001', { transports: ['websocket', 'polling', 'flashsocket'] }); // Add this -- our server will run on port 3001, so we connect to it from here

function App() {
    const [name, setName] = useState('');
    const [sexe, setSexe] = useState('Male');
    const [room, setRoom] = useState('');
    const [socketId, setSocketId] = useState(null);

    useEffect(() => {
        // Se connecter au serveur et récupérer l'identifiant de socket

        fetch(`http://localhost:3001/fetchId`)
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
