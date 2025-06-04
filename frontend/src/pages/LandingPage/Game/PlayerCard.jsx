import styles from "./PlayerCard.module.css";

export default function PlayerCard({playerData}) {
    const abbreviations = {
        "Europe League Championship Series": "LEC",
        "League of Legends Championship Series": "LCS",
        "LoL Champions Korea": "LCK",
        "League of Legends Championship of The Americas North": "LTA North",
        "League of Legends Championship of The Americas South": "LTA South",
        "North America League Championship Series": "LCS",
        "Tencent LoL Pro League": "LPL",
        "LoL The Champions": "LCK",
        "LoL EMEA Championship": "LEC",
        "Mid-Season Invitational": "MSI",
        "Esports World Cup": "EWC",
        "World Championship": "WCS"
    };

    const statusCssMap = {
        0: styles.wrong,
        1: styles.lower,
        2: styles.higher,
        3: styles.correct,
        "playing": styles.wrong,
        "win": styles.correct,
        "lose": styles.wrong
    };

    return (
        <div className={styles.container}>
            <img className={`${styles.image} ${statusCssMap[playerData.state.status]}`} src={playerData.playerImage}
                 alt={`${playerData.name} headshot`}/>

            <div className={`${styles.card} ${statusCssMap[playerData.state.kills]}`}>
                <div>{playerData.kills}</div>
                <div>Kills</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.deaths]}`}>
                <div>{playerData.deaths}</div>
                <div>Deaths</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.assists]}`}>
                <div>{playerData.assists}</div>
                <div>Assists</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.cspm]}`}>
                <div>{playerData.cspm}</div>
                <div>CS/M</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.wins]}`}>
                <div>{playerData.wins}</div>
                <div>Wins</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.losses]}`}>
                <div>{playerData.losses}</div>
                <div>Losses</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.role]}`}>
                <div>{playerData.playerPerSplit.role}</div>
                <div>Role</div>
            </div>
            <div className={`${styles.card} ${statusCssMap[playerData.state.league]}`}>
                <div>{abbreviations[playerData.team.league]}</div>
                <div>League</div>
            </div>

            <img className={`${styles.image} ${statusCssMap[playerData.state.team]}`}  src={playerData.teamImage} alt={`${playerData.team.image} logo`}/>
        </div>

    );
}