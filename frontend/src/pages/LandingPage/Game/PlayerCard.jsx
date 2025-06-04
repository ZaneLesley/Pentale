import styles from "./PlayerCard.module.css";

export default function PlayerCard({playerData}) {
    return (
        <div>
            <img className={styles.image} src={playerData.playerImage} alt={`${playerData.name} headshot`}/>
            <div>{playerData.name}</div>
            <div>Kills: {playerData.kills}</div>
            <div>Deaths: {playerData.deaths}</div>
            <div>Assists: {playerData.assists}</div>
            <div>CS/M: {playerData.cspm}</div>
            <div>Wins: {playerData.wins}</div>
            <div>losses: {playerData.losses}</div>
            <div>Role: {playerData.playerPerSplit.role}</div>
            <img className={styles.image} src={playerData.teamImage} alt={`${playerData['team'].image} logo`}/>
            <div>League: {playerData.team.league}</div>
        </div>
    );
}