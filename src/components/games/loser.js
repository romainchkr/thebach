import React, {useEffect, useState} from "react";

// Composant
const Loser = ({data, socket}) => {
    const [messageStatus, setMessageStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={handleSubmit}>

            <p>{messageStatus}</p>
        </form>
    );
};

export default Loser;