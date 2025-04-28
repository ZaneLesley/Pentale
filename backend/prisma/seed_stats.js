const {runStatsFile} = require('../python/scraper_controller');

async function main(){
    const  stats = await runStatsFile();

}

main()