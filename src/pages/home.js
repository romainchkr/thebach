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
                    if(image) {

                        const formData = new FormData();
                        formData.append('file', image)
                        formData.append('socketId', socket.id)
                        formData.append('room', room)
                        console.log(socket.id)

                        fetch(`${process.env.REACT_APP_API_URL}/upload-image`, {
                            method: 'POST',
                            body: formData
                        })
                            .then(res => {
                                console.log("wsh")
                                console.log(res)
                            });
                    }

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
                <h1>Rejoindre un groupe</h1>

                <input
                    placeholder="Nom"
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <div className="pics">
                    <label htmlFor="image">Photo de profil</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                <div>
                    <input
                        placeholder="Groupe"
                        type="text"
                        id="room"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                    />
                </div>

                <div className="sexe">
                    <div className="radio">
                        <label htmlFor="male">Homme</label>
                        <input
                            id="male"
                            type="radio"
                            value="Male"
                            checked={sexe === "Male"}
                            onChange={(e) => setSexe("Male")}
                        />
                    </div>
                    <div className="radio">
                        <label htmlFor="female">Femme</label>
                        <input
                            id="female"
                            type="radio"
                            value="Female"
                            checked={sexe === "Female"}
                            onChange={(e) => setSexe("Female")}
                        />
                    </div>
                </div>

                <p>{messageStatus}</p>

                <div className="buttonHolder">
                    <button type="submit">Jouer</button>
                </div>

            </form>
        </div>
    );
};

export default Home;