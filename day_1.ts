let input = (await Bun.file("./inputs/day1_input.txt").text()).split("\n").filter(x => x != "");

console.log(Result(true));
console.log(Result(false));

function Result(isPart1: boolean): number {
	let counter = 0;
	let previousValue = 50;
	input.forEach((i) => {
		let [turns, left] = ParseInput(i);
		let [newResult, zeroPassages] = Rotate(previousValue, turns, left, isPart1);
		counter += zeroPassages;
		previousValue = newResult;
	})
	return counter;
}

function ParseInput(element: String): [number, boolean] {
	let number = parseInt(element.match("\\d+")![0]);
	return [number, element[0] === 'L'];
}

function Rotate(currentPosition: number, turns: number, left: boolean, isPart1: boolean): [number, number] {
	let newPosition = currentPosition;
	let zeroPassages = 0;
	let multiplier = left ? -1 : 1;
	for (let i = 0; i < turns; i++) {
		newPosition += multiplier;
		if (newPosition < 0) newPosition = 99;
		if (newPosition > 99) newPosition = 0;
		if (newPosition == 0 && !isPart1) zeroPassages++;
	}
	if (newPosition === 0 && isPart1) zeroPassages++;
	return [newPosition, zeroPassages];
}
