import {HypercubeGraph, Cell} from 'tessellatron'
import {shuffle} from '../random'


export const recursiveDFT = (
	graph: HypercubeGraph,
	id01: number,
): void => {

	// create cell from id.
	const cell01: Cell = graph.data[id01]

	// mark self as 'active'.
	cell01.status = 'active'

	// TODO: await command to continue.
	// ...

	// loop through neighbors in a random order.
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

				// recursively call with new neighbor.
				recursiveDFT(graph, id02)

				// mark self as 'active' once complete.
				cell01.status = 'active'

				// TODO: await command to continue.
				// ...
			}
		}
	}

	// mark cell as completed; neighbors have been exhuasted.
	cell01.status = 'complete'
}
