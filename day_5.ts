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
		return CalculateAllFreshIngredients(OptimizeInventory(inventory));
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
	let result: [number, number][] = JSON.parse(JSON.stringify(inventory));

	for (const item of result.filter(i => i[0]! === i[1]!)) {
		result.splice(result.indexOf(item), 1);
	}

	// Find ranges that lie entirely within other ranges
	//
	for (let item of result) {
		const inventoryWithoutCurrentItem = result.filter(i => i[0]! != item[0!] && i[1]! != item[1]!);
		const duplicateRange = inventoryWithoutCurrentItem.find(r => r[0]! >= item[0]! && r[1]! <= item[1]!);
		if (duplicateRange) {
			result.splice(result.indexOf(duplicateRange), 1);
		}
	}

	for (let item of result) {
		let followingItem = result.find(i => i[0]! === item[1!]);
		if (followingItem) {
			result[result.indexOf(followingItem)] = [followingItem[0]! + 1, followingItem[1]!];
		}
	}

	// Find overlapping ranges
	for (let item of result) {
		const inventoryWithoutCurrentItem = result.filter(i => i[0]! != item[0!] && i[1]! != item[1]!);
		let overlappingItems = inventoryWithoutCurrentItem.filter(i => item[0]! >= i[0]! && item[0]! <= i[1]!);
		for (const item2 of overlappingItems)
		{
			result[result.indexOf(item)] = [item[0]! + 1, item2[1]!];
		}
	}


	return result
}
