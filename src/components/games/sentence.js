import React, {useState} from "react";

// Composant
const Sentence = ({question}) => {
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
        <div className="sentence">
            <form onSubmit={handleSubmit}>
                <p>{question}</p>
                <input
                    type="text"
                    id="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button type="submit">Valider</button>
            </form>
        </div>
    );
};

export default Sentence;