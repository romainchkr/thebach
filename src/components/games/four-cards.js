import React, {useState} from "react";

// Composant
const FourCards = ({question, choices}) => {
    const [answer, setAnswer] = useState('');

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
            <p>{question}</p>
            <div className="line" >
                <div className={`card ${answer === choices[0] ? "cardActive" : ""}`} style={{ backgroundImage: `url(${choices[0].img})` }}
                onClick={(e)=>setAnswer(choices[0])}>
                    <p>{choices[0].text}</p>
                </div>

                <div className={`card ${answer === choices[1] ? "cardActive" : ""}`} style={{ backgroundImage: `url(${choices[1].img})` }}
                     onClick={(e)=>setAnswer(choices[1])}>
                    <p>{choices[1].text}</p>
                </div>
            </div>

            <div className="line">
                <div className={`card ${answer === choices[2] ? "cardActive" : ""}`} style={{ backgroundImage: `url(${choices[2].img})` }}
                     onClick={(e)=>setAnswer(choices[2])}>
                    <p>{choices[2].text}</p>
                </div>

                <div className={`card ${answer === choices[3] ? "cardActive" : ""}`} style={{ backgroundImage: `url(${choices[3].img})` }}
                     onClick={(e)=>setAnswer(choices[3])}>
                    <p>{choices[3].text}</p>
                </div>
            </div>

            <button type="submit">Valider</button>
        </form>
    );
};

export default FourCards;