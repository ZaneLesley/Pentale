import GameForm from './GameForm';
import PlayerCard from './PlayerCard'

import {useState} from 'react';

export default function Game() {
    const [playerData, setPlayerData] = useState(null);

    console.log(playerData)
    return (
        <>
            <h1>Pentale</h1>
            <GameForm onPlayerFound={setPlayerData}></GameForm>
            {playerData && <PlayerCard playerData={playerData} />}

        </>
    );
}