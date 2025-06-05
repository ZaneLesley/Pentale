import GameForm from './GameForm';
import PlayerCard from './PlayerCard';
import WinModal from './WinModal';
import {useEffect, useState} from 'react';
import {analyzeGuess, generateGame} from "../../../api/game";
import {fetchPlayerImage} from '../../../api/player';
import {fetchTeamImage} from '../../../api/team';
import styles from './Game.module.css';

export default function Game() {
    const [players, setPlayers] = useState([]);
    const [showModal, setShowModal] = useState(false);

    // useEffect for starting the game
    useEffect(() => {
        startGame();
    }, []);

    // Watch for players updates to see if we won
    useEffect(() => {
        if (players.length === 0) return;
        if (players[players.length - 1].state.status === "win" || players[players.length - 1].state.status === "lose") {
            setShowModal(true);
        }
    }, [players]);

    async function startGame() {
        await generateGame();
        setShowModal(false);
        setPlayers([]);
    }

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

        setPlayers((prev) => [...prev, enrichedPlayer].slice(0, 5));
    }

    return (
        <>
            <div className={styles.container}>
                <div style={{width:'100%'}}>
                    {showModal && players.length > 0 &&
                        <WinModal setPlayers={setPlayers}
                                  state={players[players.length - 1].state}
                                  setShowModal={setShowModal}
                        ></WinModal>}
                    <GameForm
                        onPlayerFound={handlePlayerFound}
                    />
                    {players.map((player, i) => (
                        <PlayerCard key={i} playerData={player}/>
                    ))}
                </div>
                <button className={styles.button} onClick={startGame}>New Game</button>
            </div>
        </>
    );
}