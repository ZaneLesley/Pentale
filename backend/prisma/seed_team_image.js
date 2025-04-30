const {runTeamImageFile} = require('../python/scraper_controller');

async function main(){
    const image = await runTeamImageFile('team_image_scrapper.py');
}

main()