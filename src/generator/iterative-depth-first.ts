import {HypercubeGraph, Cell} from 'tessellatron'
import {shuffle} from '../random'


export const iterativeDFT = (
	graph: HypercubeGraph,
	id: number,
) => {
	// create a stack to iterate through.
	// this cannot be modified directly.
	// instead, use pop, push, and peek.
	const stack: Array<number> = []

	// pop removes one from the "top" of the stack.
	const pop = (): void => {stack.pop()}

	// push adds to the "top" of the stack.
	const push = (item: number): void => {stack.push(item)}

	// peek displays the "top" of the stack.
	const peek = (): number => stack.slice(-1)[0]

	// add initial ID to stack.
	push(id)

	// loop through stack until it is empty.
	while (stack.length > 0) {

		// peek this number from the stack.
		const id01: number = peek()

		// identify current cell.
		const cell01: Cell = graph.data[id01]

		// mark self as 'active'.
		cell01.status = 'active'

		// TODO: await command to continue.
		// ...

		// keep track of whether there are unvisited neighbors.
		let foundUnvisited: boolean = false

		// loop through Cell neighbors in a random order.
		const eligibleDirs: Array<string> = Object.keys(cell01.neighbors)
		const randomDirs: Array<string> = shuffle(eligibleDirs)
		for (const direction of randomDirs) {

			// identify the neighbor cell.
			const id02: number|null = cell01.neighbors[direction]

			// ensure neighbor exists
			if (id02 !== null) {
				const cell02: Cell = graph.data[id02]

				// check for unvisited neighbors.
				if (cell02.status === 'unvisited') {

					// connect the cells
					graph.connectNeighbor(direction, id01, id02)
					graph.connectPassage(direction, id01, id02)

					// transfer 'active' state to id02.
					cell01.status = 'passive'

					// found an unvisited value!
					foundUnvisited = true

					// add unvisited neighbor ID to stack.
					push(id02)

					// leave loop early since an unvisited was found.
					break
				}
			}
		}

		// check if there were no unvisited neighbors.
		if (!foundUnvisited) {

			// since there were no unvisited neighbors...
			// this cell is unequivically complete!
			cell01.status = 'complete'

			// remove id01 from the stack.
			// id01 is on top, so pop() will remove it.
			pop()
		}
	}
}
