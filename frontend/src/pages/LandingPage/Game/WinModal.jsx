import {Box, Modal} from "@mui/material";
import {useState, useEffect} from "react";
import {fetchCorrectGuess, generateGame} from "../../../api/game";

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


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'gray',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
    };

    return (
        <>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box sx={{...style, width: 200}}>
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