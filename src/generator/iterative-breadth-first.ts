import Graph, {Cell} from 'tessellatron'
import {Queue, shuffle} from 'maze-utilities'

export const iterativeBFT = (
	graph: Graph,
	id: number,
) => {

	// create a queue to iterate with.
	// this cannot be modified directly.
	// instead, use enqueue, dequeue, and peek.
	const queue: Queue<number> = new Queue()

	// add initial ID to queue.
	queue.enqueue(id)

	// loop through stack until it is empty.
	while (queue.hasNodes) {

		// peek this number from the stack.
		const id01: number = queue.front()

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
					cell02.status = 'active'

					// TODO: await command to continue.
					// ...

					// found an unvisited value!
					foundUnvisited = true

					// add unvisited neighbor ID to stack.
					queue.enqueue(id02)

					// remove active status;
					// the next ID will become active now.
					// eventually, id02 will be called upon again.
					cell02.status = 'passive'

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
			queue.dequeue()
		}
	}
}
