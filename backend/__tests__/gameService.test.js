const {analyzeGuess} = require("../services/gameService");
const correctPlayer = require("./__fixtures__/armao.json");
const guessPlayer = require("./__fixtures__/faker.json");

describe("analyzeGuess", () => {

    // Tests for Game State
    test('result status updates to "playing" when guess is incorrect and guess count < 5', () => {
        const numGuesses = 0;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('playing');
    });

    test('result status updates to "lose" when guess is incorrect and guess count >= 5', () => {
        const numGuesses = 4;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('lose');
    });

    test('result status updates to "win" when guess ID matches correct ID', () => {
        const numGuesses = 0;
        const updatedPlayer = {...guessPlayer, id: correctPlayer.id};
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('win');
    });

    // Tests for Player Comparisons
    test('result status for role to be 0 when guessPlayer.role !== correctPlayer.role', () => {
        const numGuesses = 0;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.role).toBe(0);
    });

    test('result status for role to be 1 when guessPlayer.role === correctPlayer.role', () => {
        const numGuesses = 0;
        const updatedPlayer = {
            ...guessPlayer, playerPerSplit: {
                role: correctPlayer.playerPerSplit.role,
            }
        };
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.role).toBe(3);
    });

    // Tests for Team Comparisons
    test('result status for team to be 0 when guessPlayer.team !== correctPlayer.team', () => {
        const numGuesses = 0;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.team).toBe(0);
    });

    test('result status for team to be 1 when guessPlayer.team === correctPlayer.team', () => {
        const numGuesses = 0;
        const updatedPlayer = {
            ...guessPlayer, team: {
                name: correctPlayer.team.name,
            }
        };
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.team).toBe(3);
    });

    // Numerical Keys
    test('result status for numerical keys 3 when guessPlayer.key < correctPlayer.key', () => {
        const numGuesses = 0;
        const updatedPlayer = {...guessPlayer, cspm: 0.5};
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.cspm).toBe(2);
    });

    test('result status for numerical keys 3 when guessPlayer.key < correctPlayer.key', () => {
        const numGuesses = 0;
        const updatedPlayer = {...guessPlayer, cspm: 11.5};
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.cspm).toBe(1);
    });

    test('result status for numerical keys 3 when guessPlayer.key === correctPlayer.key', () => {
        const numGuesses = 0;
        const updatedPlayer = {...guessPlayer, cspm: correctPlayer.cspm};
        const result = analyzeGuess(updatedPlayer, correctPlayer, numGuesses);
        expect(result.cspm).toBe(3);
    });
});