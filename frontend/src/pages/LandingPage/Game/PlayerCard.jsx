import {fetchPlayerImage} from '../../../api/player';
import {useState, useEffect} from "react";

export default function PlayerCard({playerData}) {
    const [wins, losses] = playerData.record.split("-");
    const [image, setImage] = useState(null);

    useEffect(() => {
        async function loadImage() {
            const img = await fetchPlayerImage(playerData.image);
            setImage(img);
        }

        loadImage();
    }, [playerData.image]);

    return (
        <div>
            <img src={image} alt={`${playerData.name} headshot`} />
            <div>{playerData.name}</div>
            <div>Kills: {playerData.kills}</div>
            <div>Deaths: {playerData.deaths}</div>
            <div>Assists: {playerData.assists}</div>
            <div>CS/M: {playerData.cspm}</div>
            <div>Wins: {wins}</div>
            <div>losses: {losses}</div>
        </div>
    );
}