let ingredients: number[] = [];
let inventory: [number, number][] = [];

(await Bun.file("./inputs/day5_test.txt").text())
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

//console.log(Result(true));
console.log(Result(false));


function Result(isPart1: boolean): number {
	if (isPart1) {
		return ingredients.reduce((acc, curr) => {
			if (IsIncludedInInventory(curr, inventory)) acc += 1;
			return acc;
		}, 0);

	}
	else {
		let inv = OptimizeInventory(inventory);
		console.log(inv);
		//console.log(inv.length);
		//return CalculateAllFreshIngredients(inv);
		return 0;
	}
}

function CalculateAllFreshIngredients(inventory: [number, number][]): number {
	return inventory.reduce((acc, curr) => {
		return acc + (curr[1]! - curr[0]! + 1);
	}, 0);
}

function IsIncludedInInventory(ingredientId: number, inventory: [number, number][]) {
	return inventory.reduce((acc, curr) => {
		if (ingredientId >= curr[0]! && ingredientId <= curr[1]!) {
			acc = true;
		}
		return acc;

	}, false);
}

function OptimizeInventory(inventory: [number, number][]): [number, number][] {
	// 1. If result lies entirely within another result, omit
	// 2. If overlap: modify start/end so items do not overlap
	return inventory.reduce((acc: [number, number][], curr) => {
		// 1: Result lies entirely within already existing
		if (acc.find(item => item[0]! >= curr[0]! && item[1] <= curr[1]!)) return acc;

		// 2: overlap at the start; e.g. 2-10 and 1-5
		const overlapStart = acc.find(item => item[1]! >= curr[0]! && item[1]! <= curr[1]!);
		const overlapEnd = acc.find(item => item[0]! <= curr[1]! && item[0]! >= curr[0]!);

		if (overlapStart || overlapEnd) {
			if (overlapStart) {
				console.log("Overlap Start");
				let result: [number, number] = [overlapStart[1]! + 1, curr[1]!];
				acc.push(result);
				console.log(overlapStart);
				console.log(curr);
				console.log(result);
				console.log("");
			}
			if (overlapEnd) {
				let result : [number, number] = [curr[0]!, overlapEnd[0]! - 1];
				console.log("Overlap End");
				acc.push(result);
				console.log(overlapEnd);
				console.log(curr);
				console.log(result);
				console.log("");
			}
		}
		else {
			acc.push([curr[0]!, curr[1]!]);
		}
		return acc;
	}, []);
}
