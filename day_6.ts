interface HomeworkItem {
	Operands: number[],
	IsMultiplication: boolean
}

let parsedInput = (await Bun.file("./inputs/day6_input.txt").text())
	.split("\n")
	.filter(r => r != "")
	.reduce((acc: HomeworkItem[], curr) => {
		let elements = curr.split(" ").filter(r => r != "");
		for (let i = 0; i < elements.length; i++) {
			let homeworkItem: HomeworkItem = acc[i] ?? { Operands: [], IsMultiplication: false };
			if (elements[i]! === "*" || elements[i]! === "+") {
				homeworkItem.IsMultiplication = elements[i]! === "*";
			}
			else {
				homeworkItem.Operands.push(parseInt(elements[i]!));
			}
			acc[i] = homeworkItem;
		}
		return acc;
	}, []);

console.log(parsedInput);

let result = parsedInput.reduce((acc, curr) => {
	acc += curr.Operands.reduce((acc2, curr2) => {
		if (curr.IsMultiplication) {
			acc2 *= curr2;
		}
		else {
			acc2 += curr2;
		}
		return acc2;
	}, curr.IsMultiplication ? 1 : 0);
	return acc;
}, 0);

console.log(result);
