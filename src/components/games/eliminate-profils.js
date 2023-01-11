import React, {useState} from "react";

// Composant
const EliminateProfils = ({data}) => {
    const [answer, setAnswer] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Envoyer un POST à l'adresse '/ready' avec le nom, l'image et l'URL
        /*const response = await fetch('http://localhost:3001/ready', {
            method: 'POST',
            body: JSON.stringify({ socketId, name, image, url }),
            headers: { 'Content-Type': 'application/json' },
        });
        const data = await response.json();
        console.log(data);*/
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>Eliminer 3 profils</p>

            <button type="submit">Valider</button>
        </form>
    );
};

export default EliminateProfils;