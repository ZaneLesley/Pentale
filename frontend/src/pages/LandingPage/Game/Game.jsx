import GameForm from './GameForm';
import PlayerCard from './PlayerCard'

import {useState} from 'react';

export default function Game() {
    const [players, setPlayers] = useState([]);

    console.log(players)
    return (
        <>
            <h1>Pentale</h1>
            <GameForm
                onPlayerFound={(newPlayer) => {
                    setPlayers((prev) => [...prev, newPlayer].slice(0, 5));
                }}
            />
            {players.map((player, i) => (
                <PlayerCard key={i} playerData={player} />
            ))}
        </>
    );
}