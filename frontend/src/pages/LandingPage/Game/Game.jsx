import GameForm from './GameForm';
import PlayerCard from './PlayerCard';

import {useState, useEffect} from 'react';
import {fetchRandomPlayer} from "../../../api/player";

export default function Game() {
    const [players, setPlayers] = useState([]);
    const [correctGuess, setCorrectGuess] = useState(null);

    useEffect(() => {
        async function loadPlayer() {
            const player = await fetchRandomPlayer()
            setCorrectGuess(player);
        }
        loadPlayer();
    }, []);

    return (
        <>
            <h1>Pentale</h1>
            <GameForm
                onPlayerFound={(newPlayer) => {
                    setPlayers((prev) => [...prev, newPlayer].slice(0, 5));
                }}
            />
            {players.map((player, i) => (
                <PlayerCard key={i} playerData={player}/>
            ))}
        </>
    );
}