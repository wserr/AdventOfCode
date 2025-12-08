const ranges: [number, number][]
	= [[10, 16], [8, 9], [10, 11], [6, 12], [6, 22]];

ranges.sort((a, b) =>  (b[1]! - b[0]!) - (a[1]! - a[0!]));

console.log(ranges);



let result: [number, number][] = ranges.reduce((acc: [number, number][], curr) => {
	FindOverlaps(acc, curr);
	return acc;
}, []);

function FindOverlaps(ranges: [number, number][], input: [number, number]): [number, number][] {
	let result: [number, number][] = [];
	let existingOverlap = ranges
		.find(r => (input[0]! >= r[0]! && input[0]! <= r[1]!) || (input[1]! >= r[0]! && input[1]! <= r[1]!));
	if (existingOverlap) {
		console.log(existingOverlap);
		// If it falls entirely within range, dont push it
		if (input[0]! >= existingOverlap[0]! && input[1]! <= existingOverlap[1]!) return [];

		// If input start range is below start range of existing, create new interval starting form input start until existing start -1
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

console.log(result);
