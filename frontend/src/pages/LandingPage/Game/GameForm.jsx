import {Form} from "react-router-dom";
import {useState} from "react";

import {fetchPlayerData} from "../../../api/player";

export default function GameForm({onPlayerFound}) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;

        const data = await fetchPlayerData(username);

        if (!data) {
            setUsername('')
            return;
        }

        onPlayerFound(data);
        setUsername('');
    }

    return (
        <Form onSubmit={handleSubmit}>
            <label>Player Username:
                <input type="text"
                       name="username"
                       value={username}
                       onChange={e => setUsername(e.target.value)}/>
            </label>
            <button type="submit">Search</button>
        </Form>
    );
}