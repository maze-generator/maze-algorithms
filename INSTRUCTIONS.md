<!--
# Graphs Modeling Project ([`source`](https://github.com/Make-School-Courses/CS-2.2-Advanced-Recursion-and-Graphs/blob/master/Assignments/Graph-Project.md))

## Project Description
It's your turn to tackle a real world problem using your graph theory skills.  You will chose a problem and a set of solutions to implement, using a similar approach to the [Graph Modeling Tutorial]().  You will implement graph theory solutions in python for small amounts of data within your problem scope and then innovate towards solutions when working with data at scale.

## Project Timeline
- **Due Date 1:** Problem choice submitted and approved.
- **Due Date 2:** Graph Implementation complete.
- **Due Date 3:** Blog or Presentation complete.

## Project requirements
- **Choose the problem:** Choose a problem from the provided list or a different problem that can be modeled and a graph and has solutions that can be implemented with graph algorithms from this class. You must use at least 3 different algorithms to define at least 3 different solutions.
	- **Example:** Given a network of friends, find the biggest influencer, the largest group of friends who all know each other, and the longest time it would take for a message to pass from person A to person B via friends.

- **Model the problem:** Represent the problem and the desired solutions using graphs and graph theory.
	- **Example:** The network of friends is modeled with each person being a vertex in a graph and an edge between any two people if they are friends.
	- The biggest influencer is the maximum degree of the graph.
	- The largest group of friends is the maximal clique number in the graph.  This can be approximated by Turán's theorem.
	- The time to send a message is the shortest path which can be found via Dijkstra's Algorithm.

- **Implement Graph and Algorithms in Python:** Create a python program (from scratch not using graph libraries) that can read in a small (n < 30) version of your problem from a text file and solve the algorithms above. Your code should be:
	- fully documented,
	- tested and meet [PEP8](https://realpython.com/python-pep8/) standards
	- work on any data set with (n < 30) defined to meet problem specifications as defined in your documentation (README)
	- Have a README that fully defines the problem scope and solutions
	- available as a separate repository on GitHub.
- **Discuss Scale:** What happens with your solutions at scale? (n >>> 30).
	- Is your problem still solvable?
	- What is the time complexity of the algorithms you are using?
	- Discuss in your GitHub README and associated Summary.
	- If possible, implement a more scalable solution using tools like Dynamic Programming or by using a different algorithm that solves the same problem faster.
- **Blog or Present:** Create a presentation or blog post of your project according to the [Presentation Rubric](https://docs.google.com/document/d/1WTLcZNyvRGYDz5L8Kr8a0ILbFAyr92u85paoqGFjxPg/edit?usp=sharing) or [Blog Post Rubric](https://docs.google.com/document/d/1T1oqHFoRo0kl7mPUTFupmsoEkLYltKsVgtqyGKDaCgY/edit?usp=sharing).


## Stretch Project Requirements
- Implement a common graph algorithm that was not covered in class on your program.
- Use graph libraries to refactor your code implementations, benchmark and compare results.

## List of possible problem choices:  (Do not choose social network as that was already covered in the tutorial)
- Airplane Scheduling
- Computer Networks
- Job Scheduling
- The Internet
- [Applications of Graph Theory](https://en.wikipedia.org/wiki/Graph_theory#Applications)
--->
