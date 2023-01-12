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

function Game({ name, sexe, room, socketId, socket }) {
    const navigate = useNavigate();
    const [game, setGame] = useState(null);
    const [userCount, setUserCount] = useState(0);
    const [maxUser, setMaxUser] = useState(0);

    useEffect(() => {

        fetch(`${process.env.REACT_APP_API_URL}/room-count`, {
            method: 'POST',
            body: JSON.stringify({ room }),
            headers: { 'Content-Type': 'application/json' },
            })
            .then(res => res.json())
            .then(data => {
                setUserCount(data.count);
                setMaxUser(data.max);
            });

        socket.on('update_count', data => {
            console.log("wsh");
            console.log(data)
            setUserCount(data.count)
            setMaxUser(data.max)
        });

        socket.on('game', data => {
            console.log(data);
            setGame(data);
        });
    }, []);

    if(!game) {
        if(userCount >= 0 ) {
            return (
                <div>
                    Waiting for users : {userCount} / {maxUser}
                </div>
            );
        } else {
            return (
                <div>
                    You need to join a room
                </div>
            );
        }

    }
    if(game.game.type === "sentence") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <Sentence question={game.game.question} socket={socket} gameId={game.game.id}/>
            </div>
        );
    } else if (game.game.type === "two-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <TwoChoices question={game.game.question} choice1={game.game.choices[0].text} choice2={game.game.choices[1].text} socket={socket} gameId={game.game.id}/>
            </div>
        );
    } else if (game.game.type === "four-choice"){
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <FourCards question={game.game.question} choices={game.game.choices} socket={socket} gameId={game.game.id}/>
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
                <Eliminate data={game.game} socket={socket} nbToEliminate={game.game.nbToEliminate}/>
            </div>
        );
    } else if(game.game.type === "first_game") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <p>Waiting for contenders to play their first game</p>
            </div>
        );
    } else if(game.game.type === "two-chats") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <TwoChats data={game.game.data}/>
            </div>
        );
    } else if(game.game.type === "winner-chat") {
        return (
            <div>
                <LinearDeterminate duration={game.duration}/>
                <WinnerChat data={game.game.data}/>
            </div>
        );
    } else if(game.game.type === "loser") {
        return (
            <div>
                <p>{game.game.message}</p>
                <button onClick={()=> navigate('/', { replace: true })}>Go back to lobby</button>
                {/*<Loser />*/}
            </div>
        );
    }
}

export default Game