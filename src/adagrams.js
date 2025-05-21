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
const LETTER_POOL = []
	.concat(Array(9).fill('A'))
	.concat(Array(2).fill('B'))
	.concat(Array(2).fill('C'))
	.concat(Array(4).fill('D'))
	.concat(Array(12).fill('E'))
	.concat(Array(2).fill('F'))
	.concat(Array(3).fill('G'))
	.concat(Array(2).fill('H'))
	.concat(Array(9).fill('I'))
	.concat(Array(1).fill('J'))
	.concat(Array(1).fill('K'))
	.concat(Array(4).fill('L'))
	.concat(Array(2).fill('M'))
	.concat(Array(6).fill('N'))
	.concat(Array(8).fill('O'))
	.concat(Array(2).fill('P'))
	.concat(Array(1).fill('Q'))
	.concat(Array(6).fill('R'))
	.concat(Array(4).fill('S'))
	.concat(Array(6).fill('T'))
	.concat(Array(4).fill('U'))
	.concat(Array(2).fill('V'))
	.concat(Array(2).fill('W'))
	.concat(Array(1).fill('X'))
	.concat(Array(2).fill('Y'))
	.concat(Array(1).fill('Z'));

export const drawLetters = () => {
	const hand = [];
	const handCounts = {};

	while (hand.length < 10) {
		const randomIndex = Math.floor(Math.random() * LETTER_POOL.length);
		const letter = LETTER_POOL[randomIndex];

		// Count how many times letter appears in hand
		if (!handCounts[letter]) {
			handCounts[letter] = 1;
		} else {
			handCounts[letter]++;
		}

		// Only add if we haven't exceeded allowed frequency in the pool
		const letterMax = LETTER_POOL.filter((l) => l === letter).length;
		if (handCounts[letter] <= letterMax) {
			hand.push(letter);
		} else {
			handCounts[letter]--; // undo overdraw yeeet
		}
	}

	return hand;
};

export const usesAvailableLetters = (input, lettersInHand) => {
	// Implement this method for wave 2
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
	// Implement this method for wave 3
};

export const highestScoreFrom = (words) => {
	// Implement this method for wave 4
};
