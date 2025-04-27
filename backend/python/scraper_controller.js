const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');

const venvPath = path.join(__dirname, 'scraper', 'env', 'bin', 'python');

async function runScraperFile(filename) {
    return new Promise((resolve, reject) => {
        const scraperPath = path.join(__dirname, 'scraper', filename);

        console.log('Running python file: ' + filename + ' please wait...');
        const pythonProcess = spawn(venvPath, [scraperPath]);

        pythonProcess.stdout.on('data', (stream) => {
            console.log('PlayerScraper:  ' + stream.toString());
        });

        pythonProcess.stderr.on('data', (stream) => {
            console.log('PlayerScraper:  ' + stream.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('Python script exited with code ${code}'));
            } else {
                try {
                    let filename = path.join(__dirname, 'scraper', 'unique_player_data.json');
                    let file = fs.readFileSync(filename, 'utf8');
                    const playerUniqueData = JSON.parse(file);
                    filename = path.join(__dirname, 'scraper', 'data.json');
                    file = fs.readFileSync(filename, 'utf8');
                    const playerSeasonData = JSON.parse(file);
                    resolve({
                        season: playerSeasonData,
                        player: playerUniqueData
                    });

                } catch (err) {
                    reject(new Error('Failed to parse JSON from Python output: ' + err.message));
                }
            }
        });
    });
}


async function main() {
    await runScraperFile('player_scraper.py');
}

module.exports = {runScraperFile};