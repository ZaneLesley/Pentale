const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');

const venvPath = path.join(__dirname, 'scraper', 'env', 'bin', 'python');

async function runScraperFile(filename, jsonFiles) {
    return new Promise((resolve, reject) => {
        const scraperPath = path.join(__dirname, 'scraper', filename);

        console.log('Running python file: ' + filename + ' please wait...');
        const pythonProcess = spawn(venvPath, [scraperPath]);

        pythonProcess.stdout.on('data', (stream) => {
            console.log('running...');
        });

        pythonProcess.stderr.on('data', (stream) => {
            console.log('error:  ' + stream.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error('Python script exited with code ${code}'));
            } else {
                const result = {};
                try {
                    jsonFiles.forEach(file => {
                        result[file] = readFile(file);
                    });
                    resolve(result);
                } catch (err) {
                    reject(new Error('Failed to parse JSON from Python output: ' + err.message));
                }
            }
        });
    });
}

function readFile(filename) {
    let filePath = path.join(__dirname, 'scraper', filename);
    let file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
}


async function main() {
    await runScraperFile('player_scraper.py', ['unique_player_data.json', 'data.json']);
}

module.exports = {runScraperFile};