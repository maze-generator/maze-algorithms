import Graph from 'tessellatron'
import {shuffle} from 'maze-utilities'

export default class RecursiveDepthFirst {
	constructor (
		graph,
		id00 = 0,
	) {

		// take in the graph.
		this.graph = graph

		// start at the initial value
		this.start = id00
	}

	* generator (id01 = this.start) {

		// create cell from id.
		const cell01 = this.graph.data[id01]

		// mark self as 'active'.
		cell01.status = 'active'

		// await command to continue.
		yield

		// loop through neighbors in a random order.
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

					// recursively call with new neighbor.
					yield * this.generator(id02)

					// mark self as 'active' once complete.
					cell01.status = 'active'

					// await command to continue.
					yield
				}
			}
		}

		// mark cell as completed; neighbors have been exhuasted.
		cell01.status = 'complete'

		// await command to continue.
		yield
	}
}
