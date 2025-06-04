import GameForm from './GameForm';
import PlayerCard from './PlayerCard';
import {useEffect, useState} from 'react';
import {analyzeGuess, generateGame} from "../../../api/game";
import {fetchPlayerImage} from '../../../api/player';
import {fetchTeamImage} from '../../../api/team';

export default function Game() {
    const [players, setPlayers] = useState([]);

    // useEffect for starting the game
    useEffect(() => {
        async function startGame() {
            await generateGame();
        }

        startGame();
    }, []);

    // useEffect for analyzing the game state after the guess from the player
    useEffect(() => {
        if (players.length === 0) return;

        async function onPlayerUpdate() {
            const res = await analyzeGuess(players[players.length - 1]);
            console.log(res);
        }

        onPlayerUpdate();
    }, [players]);

    async function handlePlayerFound(newPlayer) {
        const [playerImage, teamImage] = await Promise.all([
            fetchPlayerImage(newPlayer.image),
            fetchTeamImage(newPlayer.team.image)
        ]);

        const enrichedPlayer = {
            ...newPlayer,
            playerImage,
            teamImage
        };

        setPlayers((prev) => [...prev, enrichedPlayer].slice(0, 5));
    }

    return (
        <>
            <h1>Pentale</h1>
            <GameForm
                onPlayerFound={handlePlayerFound}
            />
            {players.map((player, i) => (
                <PlayerCard key={i} playerData={player}/>
            ))}
        </>
    );
}