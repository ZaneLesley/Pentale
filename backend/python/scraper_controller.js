const {spawn} = require('child_process');
const path = require('path');
const fs = require('fs');
const {PrismaClient} = require('../generated/prisma');
const prisma = new PrismaClient();


const venvPath = path.join(__dirname, 'scraper', 'env', 'bin', 'python');

async function runScraperFile(filename, jsonFiles) {
    return new Promise((resolve, reject) => {
        const scraperPath = path.join(__dirname, 'scraper', filename);

        console.log('Running python file: ' + filename + ' please wait...');
        const pythonProcess = spawn(venvPath, [scraperPath]);

        pythonProcess.stdout.on('data', () => {
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

async function runStatsFile() {
    return new Promise(async (resolve, reject) => {
        const scraperPath = path.join(__dirname, 'scraper', 'player_stats_scraper.py');

        console.log('Running stats scraper.py', scraperPath);

        const data = await prisma.playerPerSplit.findMany({
            select: {
                link: true,
                event: true
            },
            orderBy: {
                link: 'asc'
            }
        });

        const playerEventMap = {};
        data.forEach(item => {
            if (!playerEventMap[item.link]) {
                playerEventMap[item.link] = [];
            }
            playerEventMap[item.link].push(item.event);
        });

        const filename = path.join(__dirname, '/temp_data.json');
        const payload = {playerEventMap};
        fs.writeFileSync(filename, JSON.stringify(payload));

        const pythonProcess = spawn(venvPath, [scraperPath, filename]);

        pythonProcess.stdout.on('data', (stream) => {
            console.log(stream.toString());
        });

        pythonProcess.stderr.on('data', (stream) => {
            console.error('stderr:', stream.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

async function runPlayerImageFile(filename) {
    return new Promise(async (resolve, reject) => {
        const scraperPath = path.join(__dirname, 'scraper', filename);

        console.log('Running python file: ' + filename + ' please wait...');

        const data = await prisma.player.findMany({
            select: {
                name: true,
            },
            orderBy: {
                name: 'asc'
            }
        });

        const pythonProcess = spawn(venvPath, [scraperPath, filename, JSON.stringify(data)]);

        pythonProcess.stdout.on('data', (stream) => {
            console.log(stream.toString());
        });

        pythonProcess.stderr.on('data', (stream) => {
            console.error('stderr:', stream.toString());
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script exited with code ${code}`));
            } else {
                resolve();
            }
        });
    });
}

function readFile(filename) {
    let filePath = path.join(__dirname, '../prisma', filename);
    let file = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(file);
}

module.exports = {runScraperFile, runStatsFile, runPlayerImageFile};