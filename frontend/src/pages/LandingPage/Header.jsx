import styles from './Header.module.css';

export default function Header() {
    return (
        <>
            <div className={styles.container}>
                <h1>Pentale</h1>
                <small>Guess the Pro League of Legends Player</small>
            </div>
        </>
    );
}