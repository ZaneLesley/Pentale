import GameForm from './GameForm';
import PlayerCard from './PlayerCard';

import {useState, useEffect} from 'react';
import {fetchRandomPlayer} from "../../../api/player";

export default function Game() {
    const [players, setPlayers] = useState([]);
    const [correctGuess, setCorrectGuess] = useState(null);

    useEffect(() => {
        async function loadPlayer() {
            const player = await fetchRandomPlayer();
            setCorrectGuess(player);
        }

        loadPlayer();
    }, []);

    useEffect(() => {
        if (players.length === 0 || !correctGuess) return;
        analyzePlayerGuess(players[players.length - 1], correctGuess[0]);
    }, [players, correctGuess]);
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

function analyzePlayerGuess(player, correctPlayer) {
    console.log(player, correctPlayer);
    if (player.id === correctPlayer.id) {
        console.log("You Win!");
        return;
    }

    const [playerWins, playerLosses] = player.record.split("-").map(s => parseInt(s.trim(), 10));
    const [correctPlayerWins, correctPlayerLosses] = correctPlayer.record.split("-").map(s => parseInt(s.trim(), 10));

    const playerStats = {
        ...player,
        wins: playerWins,
        losses: playerLosses
    };

    const correctStats = {
        ...correctPlayer,
        wins: correctPlayerWins,
        losses: correctPlayerLosses
    };

    const comparisons = [
        {key: "kills", label: "kills"},
        {key: "deaths", label: "deaths"},
        {key: "assists", label: "assists"},
        {key: "cspm", label: "cspm"},
        {key: "wins", label: "wins"},
        {key: "losses", label: "losses"}
    ];

    comparisons.forEach(({key, label}) => {
        if (playerStats[key] > correctStats[key]) {
            console.log(`Guess has less ${label}`);
        }
    });
}