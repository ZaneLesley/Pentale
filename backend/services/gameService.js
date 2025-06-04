exports.analyzeGuess = (player, correctPlayer) => {
    console.log(player);
    console.log(correctPlayer);
    const result = {};
    if (player.id === correctPlayer.id) {
        console.log("You Win!");
        return result;
    }

    const comparisons = [
        {key: "kills"},
        {key: "deaths"},
        {key: "assists"},
        {key: "cspm"},
        {key: "wins"},
        {key: "losses"}
    ];


    comparisons.forEach(({key}) => {
        if (player[key] > correctPlayer[key]) {
            result[key] = `Correct Player has less ${key}`;
        } else {
            result[key] = `Correct Player has more ${key}`;
        }
    });

    return result;
};