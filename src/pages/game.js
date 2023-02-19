import React, {useEffect, useState} from "react";
import Sentence from "../components/games/sentence";
import FourCards from "../components/games/four-cards";
import TwoChoices from "../components/games/two-choices";
import LinearDeterminate from "../components/linearDeterminate";
import EliminateProfils from "../components/games/eliminate-profils";
import Eliminate from "../components/games/eliminate";
import TwoChats from "../components/games/two-chats";
import WinnerChat from "../components/games/winner-chat";
import Loser from "../components/games/loser";
import {useNavigate} from "react-router-dom";
import JoinRoom from "../components/games/join-room";
import Visualise from "../components/games/visualise";
import AMactch from "../components/games/aMatch";

function Game({ socketId, socket, name }) {
    const navigate = useNavigate();
    const [room, setRoom] = useState('');
    const [game, setGame] = useState(null);
    const [messageStatus, setMessageStatus] = useState('');

    useEffect(() => {
        if (name !== '') {
            // with acknowledgement
            socket.emit("search_for_session", { name, socketId }, (response) => {
                console.log(response)
                if(response.status) {
                    setMessageStatus('')
                } else {
                    setMessageStatus("Une erreur est survenue")
                }
            });
        }

        socket.on('on_session_join', data => {
            console.log(data);
            setGame(data);
        });

        socket.on('game', data => {
            console.log(data);
            setGame(data);
        });
    }, []);

    const handleReplay = () => {
        socket.emit("search_for_session", { name, socketId }, (response) => {
            console.log(response)
            setGame(null)
        });
    }

    if(!game) {
        return (
            <h3 style={{color: "white", textAlign: "center", top: "50%", left: "50%", display: "flex", justifyContent:"center", alignItems:"center", minHeight:"100vh"}}>
                Recherche de matchmaking
            </h3>
        );
    }

    if(game.type === "on_session_join") {
        return (
            <div style={{color:"white", textAlign:"center"}}>
                <JoinRoom users={game.users} timeout={game.timeout}/>
            </div>
        );
    } else if(game.game.type === "sentence") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <Sentence question={game.game.question} socket={socket} gameId={game.game.id} round={game.game.round}/>
            </div>
        );
    } else if (game.game.type === "two-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <TwoChoices question={game.game.question} choice1={game.game.choices[0].text} choice2={game.game.choices[1].text} socket={socket} gameId={game.game.id} round={game.game.round}/>
            </div>
        );
    } else if (game.game.type === "four-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <FourCards question={game.game.question} choices={game.game.choices} socket={socket} gameId={game.game.id} round={game.game.round}/>
            </div>
        );
    } else if (game.game.type === "eliminate-profils"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <EliminateProfils data={game.game} socket={socket}/>
            </div>
        );
    } else if (game.game.type === "eliminate"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <Eliminate data={game.game} socket={socket} canEliminate={game.canEliminate}/>
            </div>
        );
    } else if(game.game.type === "waiting") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>

                <h3 style={{color:"white", textAlign:"center", marginTop:'25px'}}>{game.game.message}</h3>
            </div>
        );
    } else if(game.game.type === "two-chats") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <TwoChats data={game.game.data} socket={socket}/>
            </div>
        );
    } else if(game.game.type === "winner-chat") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <WinnerChat data={game.game.data} socket={socket}/>
            </div>
        );
    } else if(game.game.type === "loser") {
        return (
            <div className="buttonHolder">
                <p style={{color: "white", textAlign: "center"}}>{game.game.message}</p>
                <button type='submit' onClick={() => navigate('/', {replace: true})} style={{cursor: "pointer"}}>Go back
                    to lobby
                </button>
                {/*<Loser />*/}
            </div>
        );
    } else if(game.game.type === "visualisation" || game.game.type === "elimination-animation") {
        if (game.game.eliminated !== undefined && game.game.eliminated.id === socket.id) {
            return (
                <div>
                    <Loser socket={socket} name={name} replay={handleReplay}/>
                </div>
            );
        } else {
            return (
                <div>
                    <Visualise bachelor={game.game.bachelor} contenders={game.game.contenders}
                               eliminated={game.game.eliminated} />
                </div>
            );
        }
    } else if(game.game.type === "match") {
        return (
            <div>
                <AMactch replay={handleReplay}/>
            </div>
        );

    }
}

export default Game