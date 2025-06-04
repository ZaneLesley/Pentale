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

    async function handlePlayerFound(newPlayer) {
        const [playerImage, teamImage, state] = await Promise.all([
            fetchPlayerImage(newPlayer.image),
            fetchTeamImage(newPlayer.team.image),
            analyzeGuess(newPlayer)
        ]);

        const enrichedPlayer = {
            ...newPlayer,
            playerImage,
            teamImage,
            state,
        };

        console.log(enrichedPlayer);

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