const files = {
    players: 'seed_players.js',
    teams: 'seed_teams.js',
    player_images: 'seed_player_image.js',
    team_images: 'seed_team_image.js',
    stats: 'seed_stats.js',
};

const file = process.argv[2];

if (!files[file]) {
    console.error('incorrect or missing input for ' + file);
    process.exit(1)
}

require(`./${files[file]}`)
