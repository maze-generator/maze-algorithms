import Graph, {Cell} from 'tessellatron'
import {Stack, shuffle} from 'maze-utilities'

export default class IterativeDepthFirst {
	graph: any
	stack!: Stack<number>

	constructor (
		graph: any,
		id00: number = 0,
	) {

		// take in the graph.
		this.graph = graph

		// create a stack to iterate through.
		// this cannot be modified directly.
		// instead, use pop, push, and peek.
		this.stack == new Stack(id00)
	}

	* generator (
	): Generator {

		// loop through stack until it is empty.
		while (this.stack.hasNodes) {

			// peek this number from the stack.
			const id01: number = this.stack.peek()

			// identify current cell.
			const cell01: Cell = this.graph.data[id01]

			// mark self as 'active'.
			cell01.status = 'active'

			// await command to continue.
			yield

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
					const cell02: Cell = this.graph.data[id02]

					// check for unvisited neighbors.
					if (cell02.status === 'unvisited') {

						// connect the cells
						this.graph.connectNeighbor(direction, id01, id02)
						this.graph.connectPassage(direction, id01, id02)

						// transfer 'active' state to id02.
						cell01.status = 'passive'

						// found an unvisited value!
						foundUnvisited = true

						// add unvisited neighbor ID to stack.
						this.stack.push(id02)

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
				this.stack.pop()
			}
		}

		// await command to continue.
		yield
	}
}
