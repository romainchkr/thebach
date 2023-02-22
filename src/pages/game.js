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
import StyledAvatar from "../components/customAvatar";
import ChooseMatch from "../components/games/choose-match";

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
            <div>
                <h3 style={{color: "white", textAlign: "center", display: "flex", justifyContent:"center", alignItems:"center", paddingTop: "25px"}}>
                    Recherche de matchmaking
                </h3>

                <div className="sonar-wrapper" style={{color: "white", textAlign: "center"}}>

                    <div className="sonar-emitter">
                        <div className="sonar-wave"></div>
                        <StyledAvatar sx={{ width: 100, height: 100 }}/>
                        <p style={{textAlign:'center'}}>{name}</p>
                    </div>
                </div>
            </div>
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
                <Sentence url={game.game.bachelor_url} question={game.game.question} socket={socket} gameId={game.game.id} round={game.round}/>
            </div>
        );
    } else if (game.game.type === "two-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <TwoChoices url={game.game.bachelor_url} question={game.game.question} choice1={game.game.choices[0].text} choice2={game.game.choices[1].text} socket={socket} gameId={game.game.id} round={game.round}/>
            </div>
        );
    } else if (game.game.type === "four-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <FourCards url={game.game.bachelor_url} question={game.game.question} choices={game.game.choices} socket={socket} gameId={game.game.id} round={game.round}/>
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
                <TwoChats contenders={game.game.contenders} socket={socket}/>
            </div>
        );
    } else if(game.game.type === "winner-chat") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <WinnerChat data={game.game} socket={socket}/>
            </div>
        );
    } else if(game.game.type === "loser") {
        return (
            <div>
                <Loser socket={socket} name={name} replay={handleReplay} />
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
                <AMactch bachelor={game.game.bachelor} contender={game.game.contender} replay={handleReplay}/>
            </div>
        );
    } else if(game.game.type === "choose_match") {
        return (
            <div>
                <ChooseMatch bachelor={game.game.bachelor} contenders={game.game.contenders} socket={socket}/>
            </div>
        );
    }
}

export default Game