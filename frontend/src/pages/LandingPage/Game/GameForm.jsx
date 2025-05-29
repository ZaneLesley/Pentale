import {Form} from "react-router-dom";

export default function GameForm() {
    async function handleSubmit(e) {
        e.preventDefault();
        const username = e.target.username.value;

        const res = await fetch('http://localhost:8080/api/player', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({username})
        })
        const data = await res.json()
        console.log(data)
    }
    return (
        <Form onSubmit={handleSubmit}>
            <label>Player Username:
                <input type="text" name="username"/>
            </label>
            <input type="submit" value="Submit" />
        </Form>
    )
}