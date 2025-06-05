import styles from "./PlayerCard.module.css";
import {motion} from "framer-motion";

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

    const cardVariants = {
        hidden: { rotateY: 90, opacity: 0 },
        visible: { rotateY: 0, opacity: 1 },
    };
    const duration = 0.5;

    return (
        <motion.div
            className={styles.container}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
            initial="hidden"
            animate="visible"
        >
            <motion.img
                className={`${styles.image} ${statusCssMap[playerData.state.status]}`}
                src={playerData.playerImage}
                alt={`${playerData.name} headshot`}
                variants={cardVariants}
                transition={{ duration: duration }}
            />

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.kills]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.kills}</div>
                <div>Kills</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.deaths]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.deaths}</div>
                <div>Deaths</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.assists]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.assists}</div>
                <div>Assists</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.cspm]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.cspm}</div>
                <div>CS/M</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.wins]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.wins}</div>
                <div>Wins</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.losses]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.losses}</div>
                <div>Losses</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.role]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{playerData.playerPerSplit.role}</div>
                <div>Role</div>
            </motion.div>

            <motion.div
                className={`${styles.card} ${statusCssMap[playerData.state.league]}`}
                variants={cardVariants}
                transition={{ duration: duration }}
            >
                <div>{abbreviations[playerData.team.league]}</div>
                <div>League</div>
            </motion.div>

            <motion.img
                className={`${styles.image} ${statusCssMap[playerData.state.team]}`}
                src={playerData.teamImage}
                alt={`${playerData.team.image} logo`}
                variants={cardVariants}
                transition={{ duration: duration }}
            />
        </motion.div>
    );
}