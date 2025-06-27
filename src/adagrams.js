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

const LETTER_POOL = buildLetterPool();

export const drawLetters = () => {
	const hand = [];
	const handCounts = {};

	while (hand.length < 10) {
		const randomIndex = Math.floor(Math.random() * LETTER_POOL.length);
		const letter = LETTER_POOL[randomIndex];

		if (!handCounts[letter]) {
			handCounts[letter] = 1;
			hand.push(letter);
		} else if (handCounts[letter] < LETTER_FREQUENCY[letter]) {
			handCounts[letter]++;
			hand.push(letter);
		}
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

export const scoreWord = (word) => {
	if (!word || word.length === 0) {
		return 0;
	}

	const upper = word.toUpperCase();
	let score = 0;

	for (let i = 0; i < upper.length; i++) {
		const letter = upper[i];
		if ('AEIOULNRST'.includes(letter)) {
			score += 1;
		} else if ('DG'.includes(letter)) {
			score += 2;
		} else if ('BCMP'.includes(letter)) {
			score += 3;
		} else if ('FHVWY'.includes(letter)) {
			score += 4;
		} else if (letter === 'K') {
			score += 5;
		} else if ('JX'.includes(letter)) {
			score += 8;
		} else if ('QZ'.includes(letter)) {
			score += 10;
		}
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
