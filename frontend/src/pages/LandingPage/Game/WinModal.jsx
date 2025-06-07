import {Box, Modal} from "@mui/material";
import {useState, useEffect} from "react";
import {fetchCorrectGuess, generateGame} from "../../../api/game";
import styles from './WinModal.module.css'

export default function WinModal({setPlayers, state, setShowModal}) {
    const [open, setOpen] = useState(true);
    const [correctGuess, setCorrectGuess] = useState(null);

    const handleClose = () => {
        setOpen(false);
    };

    //TODO: Review this and try to make the code more logically, right now the game is starting in 2 places
    const handleNewGame = async() => {
        await generateGame();
        setPlayers([])
        setShowModal(false)
        setOpen(false)
    }


    useEffect(() => {
        const fetchGuess = async () => {
            const { player } = await fetchCorrectGuess();
            setCorrectGuess(player);
        };

        fetchGuess();
    }, []);

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box className={styles.container}>
                    <div>{`You ${state.status}!`}</div>
                    <div>{`Number of guesses: ${state.numGuesses}`}</div>
                    <div>{correctGuess ? `Correct Guess: ${correctGuess}` : 'Loading...'}</div>
                    <button onClick={handleClose}>Close</button>
                    <button onClick={handleNewGame}>New Game</button>
                </Box>
            </Modal>
        </>
    );
}