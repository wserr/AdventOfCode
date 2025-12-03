let input = (await Bun.file("./inputs/day1_input.txt").text()).split("\n").filter(x => x != "");
let counter = 0;
input.reduce((acc, current) => {
	let [turns, left] = ParseInput(current);
	let [newResult, zeroPassages] = Rotate(acc, turns, left);
	counter += zeroPassages;
	return newResult;
}, 50);
console.log(counter);
function ParseInput(element: String): [number, boolean] {
	let number = parseInt(element.match("\\d+")![0]);
	return [number, element[0] === 'L'];
}
function Rotate(currentPosition: number, turns: number, left: boolean): [number, number] {
	let newPosition = currentPosition;
	let zeroPassages = 0;
	let multiplier = left ? -1 : 1;
	for (let i = 0; i < turns; i++) {
		newPosition += multiplier;
		if (newPosition < 0) newPosition = 99;
		if (newPosition > 99) newPosition = 0;
		if (newPosition == 0) zeroPassages++;
	}
	return [newPosition, zeroPassages];
}
