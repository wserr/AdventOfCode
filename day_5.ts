let ingredients: number[] = [];
let inventory: [number, number][] = [];

(await Bun.file("./inputs/day5_input.txt").text())
	.split("\n")
	.forEach(l => {
		let inventoryRegex = /(\d+)-(\d+)/;
		let ingredientRegex = /(\d+)/g;

		let match = l.match(inventoryRegex)
		if (match != null) {
			inventory.push([parseInt(match[1]!), parseInt(match[2]!)]);
		}
		else {
			match = l.match(ingredientRegex)!;
			if (match != null) {
				ingredients.push(parseInt(match[0]!));
			}
		}

	});

console.log(Result(true));
console.log(Result(false));

function Result(isPart1: boolean): number {
	if (isPart1) {
		return ingredients.reduce((acc, curr) => {
			if (IsIncludedInInventory(curr, inventory)) acc += 1;
			return acc;
		}, 0);

	}
	else {
		let optimizedInventory: [number, number][] = inventory.reduce((acc: [number, number][], curr) => {
			FindOverlaps(acc, curr);
			return acc;
		}, []);
		return optimizedInventory.reduce((acc, curr) => acc += (curr[1]! - curr[0]! + 1), 0);
	}
}

function IsIncludedInInventory(ingredientId: number, inventory: [number, number][]) {
	return inventory.reduce((acc, curr) => {
		if (ingredientId >= curr[0]! && ingredientId <= curr[1]!) {
			acc = true;
		}
		return acc;

	}, false);
}

function FindOverlaps(ranges: [number, number][], input: [number, number]): [number, number][] {
	// First, sort ranges so largest ranges are handled first
	ranges.sort((a, b) =>  (b[1]! - b[0]!) - (a[1]! - a[0!]));
	let result: [number, number][] = [];
	let existingOverlap = ranges
		.find(r => (input[0]! >= r[0]! && input[0]! <= r[1]!) || (input[1]! >= r[0]! && input[1]! <= r[1]!));
	if (existingOverlap) {
		// If it falls entirely within range, dont push it
		if (input[0]! >= existingOverlap[0]! && input[1]! <= existingOverlap[1]!) return [];

		// If input start range is below start range of existing, create new interval starting from input start until existing start -1
		if (input[0]! < existingOverlap[0]!) {
			const proposedValue: [number, number] = [input[0]!, existingOverlap[0]! - 1];
			FindOverlaps(ranges, proposedValue).forEach(v => {
				result.push(v);
			});
		}

		// If input end range is above end range of existing, create new interval starting from existing + 1 until input end range
		if (input[1]! > existingOverlap[1]!) {
			const proposedValue: [number, number] = [existingOverlap[1]! + 1, input[1]!];
			FindOverlaps(ranges, proposedValue).forEach(v => {
				result.push(v);
			});
		}

		return ranges;
	}
	else {
		ranges.push(input);
	}
	return result;
}
