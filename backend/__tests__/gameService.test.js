const {analyzeGuess} = require("../services/gameService");
const correctPlayer = require("./__fixtures__/armao.json");
const guessPlayer = require("./__fixtures__/faker.json");

describe("analyzeGuess", () => {
    test('returns "playing" when guess is incorrect and guess count < 5', () => {
        const numGuesses = 0;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('playing');
    });

    test('returns "lose" when guess is incorrect and guess count >= 5', () => {
        const numGuesses = 4;
        const result = analyzeGuess(guessPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('lose');
    });

    test('returns "win" when guess ID matches correct ID', () => {
        const numGuesses = 0;
        const winningPlayer = { ...guessPlayer, id: correctPlayer.id };
        const result = analyzeGuess(winningPlayer, correctPlayer, numGuesses);
        expect(result.status).toBe('win');
    });
});