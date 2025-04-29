const {runPlayerImageFile} = require('../python/scraper_controller');

async function main(){
    const image = await runPlayerImageFile('player_image_scraper.py');
}

main()