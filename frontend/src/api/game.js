export async function generateGame() {
    try {
        const res = await fetch(`${import.meta.env.VITE_GAME_URL}/generate`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
        }

        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

export async function analyzeGuess(player) {
    try {
        const res = await fetch(`${import.meta.env.VITE_GAME_URL}/analyze`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({player}),
        });

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
        }

        return await res.json();
    } catch (e) {
        console.error(e);
    }
}

export async function fetchCorrectGuess() {
    try {
        const res = await fetch(`${import.meta.env.VITE_GAME_URL}/correct`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
        });

        if (!res.ok) {
            console.error(`Error: ${res.status}: ${res.statusText}`);
        }

        return await res.json();
    } catch (e) {
        console.error(e);
    }
}