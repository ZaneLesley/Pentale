import {Form} from "react-router-dom";
import {useState} from "react";

export default function GameForm({onPlayerFound}) {
    const [username, setUsername] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/player/`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username})
            });
            const data = await res.json();
            onPlayerFound(data);
            setUsername('');
            e.target.reset();
        } catch (err) {
            console.log(err);
            onPlayerFound(null);
            setUsername('');
        }
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