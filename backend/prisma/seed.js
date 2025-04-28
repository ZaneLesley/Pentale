const files = {
    teams: 'seed_teams.js',
    players: 'seed_players.js',
    stats: 'seed_stats.js'
};

const file = process.argv[2];

if (!files[file]) {
    console.error('incorrect or missing input for ' + file);
    process.exit(1)
}

require(`./${files[file]}`)
