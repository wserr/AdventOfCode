let input = (await Bun.file("./inputs/day2_input.txt").text())
	.split("\n")
	.flatMap((i) => i.split(",").filter((x) => x != ""));

console.log(Result(true));
console.log(Result(false));

function Result(isPart1: boolean): number {
	return input.reduce((acc, curr) => {
		var [lowerLimit, upperLimit] = GetRowItem(curr);
		for (const number of FindInvalidIds(lowerLimit, upperLimit, isPart1)) {
			acc += number;
		}
		return acc;
	}, 0);
}

function GetRowItem(input: String): [number, number] {
	const regex = /\d+/g;
	let items = input.match(regex)!;
	return [parseInt(items[0]!), parseInt(items[1]!)];
}

function FindInvalidIds(lowerLimit: number, upperLimit: number, isPart1: boolean): number[] {
	let result = [];
	for (let i = lowerLimit; i <= upperLimit; i++) {
		if (IsInvalidId(i, isPart1)) {
			result.push(i);
		}
	}
	return result;
}

function IsInvalidId(input: number, isPart1: boolean): boolean {
	let inputString = input.toString();
	const regex = isPart1 ? /(^\d*)(\1)$/gm : /(^\d*)(\1+)$/gm;
	let items = inputString.match(regex);
	let result = (items != null && items[0].toString() === inputString);
	return result;
}
