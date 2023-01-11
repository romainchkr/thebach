import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const Home = ({ name, setName, sexe, setSexe, room, setRoom, socketId, socket }) => {
    const navigate = useNavigate();
    const [image, setImage] = useState('');
    const [messageStatus, setMessageStatus] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (room !== '' && name !== '') {

            // with acknowledgement
            socket.emit("join_game", { name, sexe, image, socketId, room }, (response) => {
                console.log(response)
                if(response.status) {
                    setMessageStatus('')
                    navigate('/game', { replace: true });
                } else {
                    setMessageStatus("Game room is full")
                }

            });
        }
    }

    return (
        <div className="home">
            <form onSubmit={handleSubmit}>
                <h1>Join a game</h1>

                <label htmlFor="name">Name :</label>
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
                <label htmlFor="room">Game room :</label>
                <input
                    type="text"
                    id="room"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                />

                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Male"
                            checked={sexe === "Male"}
                            onChange={(e) => setSexe("Male")}
                        />
                        Male
                    </label>
                </div>
                <div className="radio">
                    <label>
                        <input
                            type="radio"
                            value="Female"
                            checked={sexe === "Female"}
                            onChange={(e) => setSexe("Female")}
                        />
                        Female
                    </label>
                </div>
                <p>{messageStatus}</p>

                <button type="submit">Join game</button>
            </form>
        </div>
    );
};

export default Home;