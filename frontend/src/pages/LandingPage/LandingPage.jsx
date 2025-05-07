import {useEffect} from "react";

function LandingPage() {
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8080/game');
                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData()
    }, []);

    return (
        <div className="landing-page">Stuff</div>
    );
}

export default LandingPage;