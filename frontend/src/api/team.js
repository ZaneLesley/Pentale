export async function fetchTeamImage(imagePath) {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/team/image`, {
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