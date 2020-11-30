import Graph from 'tessellatron'
import {Queue, shuffle} from 'maze-utilities'

export default class IterativeBreadthFirst {
	constructor (
		graph,
		id00 = undefined,
	) {

		// take in the graph.
		this.graph = graph

		// create a queue to iterate with.
		// this cannot be modified directly.
		// instead, use enqueue, dequeue, and peek.
		this.queue = new Queue()

		// if there is any nodes at all, choose a start node.
		// then, add it to the selection queue.
		if (this.graph.data.length > 0) {
			if (id00 === undefined) {
				id00 = Math.floor(Math.random() * this.graph.data.length)
			}
			this.queue.enqueue(id00)
		}
	}

	* generator () {

		// loop through stack until it is empty.
		while (this.queue.hasNodes) {

			// peek this number from the stack.
			const id01 = this.queue.front()

			// identify current cell.
			const cell01 = this.graph.data[id01]

			// mark self as 'active'.
			cell01.status = 'active'

			// await command to continue.
			yield

			// keep track of whether there are unvisited neighbors.
			let foundUnvisited = false

			// loop through Cell neighbors in a random order.
			const eligibleDirs = Object.keys(cell01.neighbors)
			const randomDirs = shuffle(eligibleDirs)
			for (const direction of randomDirs) {

				// identify the neighbor cell.
				const id02 = cell01.neighbors[direction]

				// ensure neighbor exists
				if (id02 !== null) {
					const cell02 = this.graph.data[id02]

					// check for unvisited neighbors.
					if (cell02.status === 'unvisited') {

						// connect the cells
						this.graph.connectNeighbor(direction, id01, id02)
						this.graph.connectPassage(direction, id01, id02)

						// transfer 'active' state to id02.
						cell01.status = 'passive'
						cell02.status = 'active'

						// await command to continue.
						yield

						// found an unvisited value!
						foundUnvisited = true

						// add unvisited neighbor ID to stack.
						this.queue.enqueue(id02)

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
				this.queue.dequeue()
			}
		}

		// await command to continue.
		yield
	}
}
