export default class Compass {
	private readonly rose:Rose
	public readonly directions:Set<string>
	private readonly opposites:{[key:string]:string}
	constructor (
		rose:Rose
	) {
		// a compass rose is a useful analogy for this property.
		// the rose knows the names of the different directions,
		// but does not know the context of those directions.
		// this is because the rose itself is a drawing.
		// it has no magnets to orient itself properly.
		this.rose = rose

		// `directions` is a simple set of named vectors.
		// luckily, these are exactly the keys of `rose`.
		this.directions = new Set(Object.keys(rose))

		// `opposites` is an object with strings for key/vals.
		// every direction has an opposite direction.
		// for example, 'north' and 'south' are opposites.
		// thus `opposites['south']` would obtain 'north'.
		this.opposites = {}


		// == TODO ==
		// this next spart is a bit of a mess.
		// great place to refactor.

		// the constructor  didn't explicitly state opposites,
		// but they can be deduced from the rose object.
		const reducer = (
			map:Map<number, string>,
			direction:string,
		):Map<number, string> => {
			// compute the `vector` of the direction.
			const axis:number = rose[direction]['axis'] + 1
			const sign:number = rose[direction]['sign']
			const vector:number = sign * axis
			// type `Map` is needed to allow numbers as keys.
			map.set(vector, direction)
			return map
		}
		const vectors:Map<number, string> = (
			Object.keys(rose).reduce(reducer, new Map())
		)
		// axes is just temporarily used in this loop.
		for (const direction in rose) {
			// compute the vector of the direction.
			const axis:number = rose[direction]['axis'] + 1
			const sign:number = rose[direction]['sign']
			const vector:number = sign * axis
			// invert the vector to get the reversed direction.
			const reversed:string = vectors.get(-vector) || 'none'
			this.opposites[direction] = reversed
		}
	}

	public reverse(direction:string):string {
		// directly pulling from `opposites` would be easy...
		// ...but, it seems more semantic using a method here!
		return this.opposites[direction]
	}

	public axisOf(direction:string):number {
		// `axis` tells the context of certain functions.
		return this.rose[direction]['axis']
	}

	public signOf(direction:string):number {
		// `sign` tells whether to invert certain functions.
		return this.rose[direction]['sign']
	}
}
