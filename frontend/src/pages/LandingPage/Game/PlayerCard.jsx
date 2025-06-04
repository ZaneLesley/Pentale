import {fetchPlayerImage} from '../../../api/player';
import {fetchTeamImage} from '../../../api/team';
import {useEffect, useState} from "react";

import styles from "./PlayerCard.module.css";

export default function PlayerCard({playerData}) {
    const [playerImage, setPlayerImage] = useState(null);
    const [teamImage, setTeamImage] = useState(null);
    useEffect(() => {
        async function loadImage() {
            let img = await fetchPlayerImage(playerData.image);
            setPlayerImage(img);
            console.log(playerData['team'].image);
            img = await fetchTeamImage(playerData['team'].image);
            setTeamImage(img);
        }

        loadImage();
    }, [playerData.image]);

    return (
        <div>
            <img className={styles.image} src={playerImage} alt={`${playerData.name} headshot`}/>
            <div>{playerData.name}</div>
            <div>Kills: {playerData.kills}</div>
            <div>Deaths: {playerData.deaths}</div>
            <div>Assists: {playerData.assists}</div>
            <div>CS/M: {playerData.cspm}</div>
            <div>Wins: {playerData.wins}</div>
            <div>losses: {playerData.losses}</div>
            <div>Role: {playerData.playerPerSplit.role}</div>
            <img className={styles.image} src={teamImage} alt={`${playerData['team'].image} logo`}/>
            <div>League: {playerData.team.league}</div>
        </div>
    );
}