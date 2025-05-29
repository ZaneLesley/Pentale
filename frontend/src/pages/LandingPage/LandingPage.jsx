import {useEffect} from "react";
import Game from './Game/Game.jsx'

function LandingPage() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData()
    }, []);

    return (
        <Game>stuff</Game>
    );
}

export default LandingPage;