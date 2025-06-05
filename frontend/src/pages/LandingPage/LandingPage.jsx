import Header from './Header'
import Game from './Game/Game.jsx';
import Footer from './Footer';
import styles from './LandingPage.module.css'

function LandingPage() {
    return (
        <>
            <div className={styles.container}>
                <Header></Header>
                <Game></Game>
                <Footer></Footer>
            </div>
        </>
    );
}

export default LandingPage;