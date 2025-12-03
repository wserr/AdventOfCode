let input = (await Bun.file("./inputs/day2_input.txt").text())
	.split("\n")
	.flatMap((i) => i.split(",").filter((x) => x != ""));

let result = input.reduce((acc, curr) => {
	var [lowerLimit, upperLimit] = GetRowItem(curr);
	for (const number of FindInvalidIds(lowerLimit, upperLimit)) {
		acc += number;
	}
	return acc;
}, 0);

console.log(result);

function GetRowItem(input: String): [number, number] {
	const regex = /\d+/g;
	let items = input.match(regex)!;
	return [parseInt(items[0]!), parseInt(items[1]!)];
}

function FindInvalidIds(lowerLimit: number, upperLimit: number): number[] {
	let result = [];
	for (let i = lowerLimit; i <= upperLimit; i++) {
		if (IsInvalidIdPart2(i)) {
			result.push(i);
		}
	}
	return result;
}

function IsInvalidId(input: number): boolean {
	let inputString = input.toString();
	if (inputString.length % 2 != 0) return false;
	let splitId = [
		inputString.substring(0, inputString.length / 2),
		inputString.substring(inputString.length / 2, inputString.length),
	];
	let result = splitId[0] === splitId[1];
	if (result) console.log(`${input} = ${splitId}`);
	return result;
}

function IsInvalidIdPart2(input: number): boolean {
	let inputString = input.toString();
	const regex = /(^\d*)(\1+)$/gm;
	let items = inputString.match(regex);
	let result = (items != null && items[0].toString() === inputString);
	if (result) {
		console.log(`${items} - ${result} - ${input}`);
	}
	return result;
}
