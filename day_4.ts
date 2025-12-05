let input = (await Bun.file("./inputs/day4_input.txt").text())
	.split("\n")
	.filter((x) => x != "")
	.map(x =>
		x.split("").map(x =>
			x === "@" ? true : false));

console.log(Result(true));
console.log(Result(false));

function Result(isPart1: boolean): number {
	if (isPart1) {
		return CalculateAccessiblePapers(input);
	}
	else {
		let total = 0;
		let previousTotal = -1;
		let clonedInput: boolean[][] = JSON.parse(JSON.stringify(input));
		let newInput: boolean[][] = JSON.parse(JSON.stringify(input));
		while (previousTotal != total) {
			PrettyPrint(newInput);
			let result = CalculateAccessiblePapers(clonedInput, newInput);
			previousTotal = total;
			total += result;
			clonedInput = JSON.parse(JSON.stringify(newInput));
		}
		return total;
	}
}

function CalculateAccessiblePapers(input: boolean[][], newInput?: boolean[][]): number {
	let x = 0;
	let y = 0;
	return input.reduce((acc, curr) => {
		let tempResult = curr.reduce((a, _) => {
			if (input[x]![y]!) {
				const result = IsPaperAccessible(input, [x, y]);
				if (result) { if (newInput) newInput[x]![y]! = false; a += 1; };
			}
			y++;
			return a;
		}, 0)
		acc += tempResult;
		y = 0;
		x++;
		return acc;
	}, 0);

}

function PrettyPrint(input: boolean[][]) {
	input.forEach(line => {
		line.forEach(element => {
			console.write(element ? "@" : ".");
		})
		console.log("");
	});
	console.log("");
}


function IsPaperAccessible(input: boolean[][], current: [number, number]): boolean {
	let locations = [
		[0, 1],
		[0, -1],
		[1, 0],
		[1, 1],
		[1, -1],
		[-1, 0],
		[-1, 1],
		[-1, -1],
	]
	let adjacentRoles = locations.reduce((acc, curr) => {
		const x = current[0]! + curr[0]!;
		const y = current[1]! + curr[1]!;
		let result = false;
		let location = input[x];
		if (location) result = location[y] ?? false;
		if (result) acc += 1;
		return acc;
	}, 0)
	return adjacentRoles < 4;
}
