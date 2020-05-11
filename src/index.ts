import Maze from './generator'

export default Maze


const newMaze = Maze([1,3,5])
const generate = newMaze.generator()
console.log(newMaze.graph.data[0])
generate.next()
generate.next()
generate.next()
console.log(newMaze.graph.data[0])
