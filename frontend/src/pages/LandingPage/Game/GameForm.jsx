import {Form} from "react-router-dom";
import {useState, useEffect} from "react";

import {Autocomplete, TextField} from '@mui/material';

import {fetchPlayerData, fetchSuggestions} from "../../../api/player";

export default function GameForm({onPlayerFound}) {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await fetchPlayerData(username);

        if (!data) {
            setUsername('');
            return;
        }

        onPlayerFound(data);
        setUsername('');
    }

    useEffect(() => {
        const delay = setTimeout(async () => {
            if (username.length >= 2) {
                try {
                    const data = await fetchSuggestions(username);
                    setSuggestions(data || []);
                } catch (err) {
                    console.error('Suggestion fetch failed:', err);
                    setSuggestions([]);
                }
                // Resets if empty
            } else {
                setSuggestions([]);
            }
        }, 200);

        return () => clearTimeout(delay);
    }, [username]);


    return (
        <Form onSubmit={handleSubmit}>
            <Autocomplete
                options={suggestions.map(player => player.name)}
                inputValue={username}
                onInputChange={(event, newInputValue) => {
                    setUsername(newInputValue);
                }}
                onChange={(event, selectedValue) => {
                    setUsername(selectedValue || '');
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Player Username"
                        variant="outlined"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const match = suggestions.find(player =>
                                    player.name.toLowerCase().startsWith(username.toLowerCase()));
                                if (match && match.name !== username) {
                                    setUsername(match.name);
                                    e.preventDefault()
                                }
                            }
                        }}/>
                )}
            />
            <button type="submit" disabled={!suggestions.some(player => player.name === username)}>
                Search
            </button>
        </Form>

    );
}