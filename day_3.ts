let input = (await Bun.file("./inputs/day3_input.txt").text())
	.split("\n")
	.filter((x) => x != "");

const result = input.reduce((acc, current) => {
	let result = FindHighestJoltage(current, 12);
	console.log(result);
	acc += result;
	return acc;
}, 0);

console.log(result);

function FindHighestJoltage(input: String, amountOfCells: number): number {
	let numbers = input.split("").map((x) => parseInt(x));
	let result: number[] = [];
	let previousIndex = -1;
	for (let i = 0; i < amountOfCells; i++) {
		let biggestNumber = numbers[previousIndex + 1]!;
		for (let j = previousIndex + 2; j < numbers.length - (amountOfCells - (i + 1)); j++) {
			if (numbers[j]! > biggestNumber) {
				biggestNumber = numbers[j]!;
			}
		}
		previousIndex = numbers.indexOf(biggestNumber, previousIndex + 1);
		result.push(biggestNumber);
	}
	return parseInt(result.reduce((acc, curr) => {
		acc += curr.toString();
		return acc;
	}, ""));
}
