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
        console.error('Network Error: ', err);
        return null;
    }
}

export async function fetchPlayerImage(imagePath) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/player/image`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({imagePath})
    });

    if (!res.ok) {
        console.error(`Error: ${res.status}: ${res.statusText}`);
    }

    const blob = await res.blob();
    return URL.createObjectURL(blob)
}

export async function fetchRandomPlayer(year = null) {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/player/random`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({year})
        })

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
            return null;
        }

        return await res.json()
    } catch  (err) {
        console.error('Network Error: ', err);
    }
}

export async function fetchSuggestions(username){
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/player/suggestions`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({username})
        })

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
            return null;
        }

        return await res.json()
    } catch (err) {
        console.error('Network Error: ', err);
    }
}