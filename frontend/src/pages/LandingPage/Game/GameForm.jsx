import {Form} from "react-router-dom";
import {useEffect, useState} from "react";

import {Autocomplete, TextField} from '@mui/material';

import {fetchPlayerData, fetchSuggestions} from "../../../api/player";

export default function GameForm({onPlayerFound}) {
    const [username, setUsername] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    async function handleSubmit(e) {
        e.preventDefault();
        const data = await fetchPlayerData(username);
        const isValid = suggestions.some(player => player.name === username);

        if (!isValid) {
            console.warn(`Player ${username} not found`);
            return;
        }

        if (!data) {
            setUsername('');
            return;
        }

        setSuggestions([])
        setUsername('');
        onPlayerFound(data);
    }

    // useEffect for getting suggestions
    useEffect(() => {
        const delay = setTimeout(async () => {
            if (username.length >= 1) {
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
        }, 100);

        return () => clearTimeout(delay);
    }, [username]);


    return (
        <Form onSubmit={handleSubmit}>
            <Autocomplete
                options={suggestions.map(player => player.name)}
                inputValue={username}
                filterOptions={(x) => x}
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
                                    e.preventDefault();
                                }
                            }
                        }}/>
                )}
            />
            <button type="submit">Search</button>
        </Form>

    );
}