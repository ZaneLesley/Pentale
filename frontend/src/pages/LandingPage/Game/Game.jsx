import GameForm from './GameForm';
import PlayerCard from './PlayerCard';

import {useEffect, useState} from 'react';
import {analyzeGuess, generateGame} from "../../../api/game";

export default function Game() {
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        async function startGame() {
            await generateGame();
        }

        startGame();
    }, []);

    useEffect(() => {
        if (players.length === 0) return;

        async function onPlayerUpdate() {
            const res = await analyzeGuess(players[players.length - 1]);
            console.log(res);
        }

        onPlayerUpdate();
    }, [players]);
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