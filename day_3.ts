let input = (await Bun.file("./inputs/day3_input.txt").text())
	.split("\n")
	.filter((x) => x != "");

const result = input.reduce((acc, current) => {
	let result = FindHighestJoltage(current, 2);
	acc += result;
	return acc;
}, 0);

console.log(result);

function FindHighestJoltage(input: String, amountOfCells: number): number {
	let numbers = input.split("").map((x) => parseInt(x));
	let biggestNumber = numbers[0]!;
	for (let i = 1; i < numbers.length - 1; i++) {
		if (numbers[i]! > biggestNumber) {
			biggestNumber = numbers[i]!;
		}
	}
	let secondBiggestNumber = numbers[numbers.indexOf(biggestNumber) + 1]!;
	for (let i = numbers.indexOf(biggestNumber) + 2; i < numbers.length; i++) {
		if (numbers[i]! > secondBiggestNumber) {
			secondBiggestNumber = numbers[i]!;
		}
	}
	return parseInt(biggestNumber.toString() + secondBiggestNumber.toString());
}
