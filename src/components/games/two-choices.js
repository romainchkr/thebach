import React, {useState} from "react";

// Composant
const TwoChoices = ({question, choice1, choice2}) => {
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
            <div style={{textAlign: 'center'}}>
                <p >{question}</p>
                <p style={{fontSize: '1.1em', cursor: 'pointer'}}
                onClick={() => setAnswer(choice1)}
                className={answer === choice1 ? "twoChoicesActive" : ""}>{choice1}</p>
                <p>Ou</p>
                <p style={{fontSize: '1.1em', cursor: 'pointer'}}
                   onClick={() => setAnswer(choice2)}
                   className={answer === choice2 ? "twoChoicesActive" : ""}>{choice2}</p>
            </div>

            <button type="submit">Valider</button>
        </form>
    );
};

export default TwoChoices;