export async function fetchPlayerData(username) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/player/`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username})
        });

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
            return null;
        }

        return await res.json();
    } catch (err) {
        console.error('Network Error: ', err)
        return null;
    }
}