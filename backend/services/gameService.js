exports.analyzeGuess = (player, correctPlayer, numGuesses) => {
    const result = {
        status: "playing",
        "numGuesses": numGuesses + 1
    };

    if (player.id === correctPlayer.id) {
        result["status"] = "win";
    }

    const numericalComparisons = [
        {key: "kills"},
        {key: "deaths"},
        {key: "assists"},
        {key: "cspm"},
        {key: "wins"},
        {key: "losses"}
    ];

    // TODO: This should really change to be more readable, key should really be a value, not a number
    const status = {
        "wrong": 0,        // Wrong
        "lower": 1,        // Lower
        "higher": 2,       // Higher
        "correct": 3,      // Correct
    };

    numericalComparisons.forEach(({key}) => {
        if (player[key] > correctPlayer[key]) {
            result[key] = status["lower"];
        } else if (player[key] < correctPlayer[key]) {
            result[key] = status["higher"];
        } else {
            result[key] = status["correct"];
        }
    });

    if (player.playerPerSplit.role === correctPlayer.playerPerSplit.role) {
        result["role"] = status["correct"];
    } else {
        result["role"] = status["wrong"];
    }

    if (player.team.name === correctPlayer.team.name) {
        result["team"] = status["correct"];
    } else {
        result["team"] = status["wrong"];
    }

    //TODO: Check to see if team.league CONTAINS that, abbrev can have multiple
    if ((player.team.league) === correctPlayer.team.league) {
        result["league"] = status["correct"];
    } else {
        result["league"] = status["wrong"];
    }
    if (numGuesses + 1 >= 5 && result.status !== "win") {
        result["status"] = "lose";
    }

    return result;
};