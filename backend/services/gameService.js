exports.analyzeGuess = (player, correctPlayer) => {
    console.log(player);
    console.log(correctPlayer);
    if (player.id === correctPlayer.id) {
        console.log("You Win!");
        return;
    }

    const comparisons = [
        {key: "kills"},
        {key: "deaths"},
        {key: "assists"},
        {key: "cspm"},
        {key: "wins"},
        {key: "losses"}
    ];

    const result = {};

    comparisons.forEach(({key}) => {
        if (player[key] > correctPlayer[key]) {
            result[key] = `Correct Player has less ${key}`;
        } else {
            result[key] = `Correct Player has more ${key}`;
        }
    });

    return result;
};