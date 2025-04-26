const {spawn} = require('child_process');
const path = require('path');

async function runTeamScraper() {
    return new Promise((resolve, reject) => {
    const scraperPath = path.join(__dirname, 'scraper', 'team_scraper.py');

    const venvPath = path.join(__dirname, 'scraper', 'env', 'bin', 'python');

    const pythonProcess = spawn(venvPath, [scraperPath]);

        let data = '';
        let errorData = '';

        pythonProcess.stdout.on('data', (chunk) => {
            data += chunk.toString();
        });

        pythonProcess.stderr.on('data', (chunk) => {
            errorData += chunk.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}: ${errorData}`));
            } else {
                try {
                    const result = JSON.parse(data);
                    resolve(result);
                } catch (err) {
                    reject(new Error('Failed to parse JSON from Python output: ' + err.message));
                }
            }
        });
    });
}

async function main() {
    try {
        const teams = await runTeamScraper();
        console.log(teams);  // <--- You now have the parsed object here!
    } catch (err) {
        console.error(err);
    }
}

main();