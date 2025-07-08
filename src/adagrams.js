const LETTER_FREQUENCY = {
	A: 9,
	B: 2,
	C: 2,
	D: 4,
	E: 12,
	F: 2,
	G: 3,
	H: 2,
	I: 9,
	J: 1,
	K: 1,
	L: 4,
	M: 2,
	N: 6,
	O: 8,
	P: 2,
	Q: 1,
	R: 6,
	S: 4,
	T: 6,
	U: 4,
	V: 2,
	W: 2,
	X: 1,
	Y: 2,
	Z: 1,
};

const buildLetterPool = () => {
	return Object.entries(LETTER_FREQUENCY).flatMap(([letter, freq]) =>
		Array(freq).fill(letter)
	);
};

export const drawLetters = () => {
	const bag = buildLetterPool(); // Flat list of all available letter tiles
	const hand = [];

	for (let i = 0; i < 10; i++) {
		const randIndex = Math.floor(Math.random() * bag.length);
		const letter = bag[randIndex];

		[bag[randIndex], bag[bag.length - 1]] = [
			bag[bag.length - 1],
			bag[randIndex],
		];
		bag.pop();

		hand.push(letter);
	}

	return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
	const handCopy = lettersInHand.slice();
	const upperInput = input.toUpperCase();

	for (let i = 0; i < upperInput.length; i++) {
		const letter = upperInput[i];
		const index = handCopy.indexOf(letter);
		if (index === -1) {
			return false;
		} else {
			handCopy.splice(index, 1);
		}
	}
	return true;
};

const LETTER_SCORES = {
	A: 1,
	B: 3,
	C: 3,
	D: 2,
	E: 1,
	F: 4,
	G: 2,
	H: 4,
	I: 1,
	J: 8,
	K: 5,
	L: 1,
	M: 3,
	N: 1,
	O: 1,
	P: 3,
	Q: 10,
	R: 1,
	S: 1,
	T: 1,
	U: 1,
	V: 4,
	W: 4,
	X: 8,
	Y: 4,
	Z: 10,
};
export const scoreWord = (word) => {
	if (!word) return 0;

	const upper = word.toUpperCase();
	let score = 0;

	for (const letter of upper) {
		score += LETTER_SCORES[letter] || 0;
	}

	if (upper.length >= 7 && upper.length <= 10) {
		score += 8;
	}

	return score;
};
export const highestScoreFrom = (words) => {
	let bestWord = '';
	let bestScore = 0;

	for (const currentWord of words) {
		const score = scoreWord(currentWord);

		if (score > bestScore) {
			bestScore = score;
			bestWord = currentWord;
		} else if (score === bestScore && bestWord.length !== 10) {
			if (currentWord.length === 10 || currentWord.length < bestWord.length) {
				bestWord = currentWord;
			}
		}
	}

	return { word: bestWord, score: bestScore };
};
