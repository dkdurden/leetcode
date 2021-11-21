class Queue {
  constructor() {
    this.items = [];
  }

  size() {
    return this.items.length;
  }

  isEmpty() {
    return this.size() === 0;
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  peek() {
    if (this.isEmpty()) return null;
    else return this.items[0];
  }
}

class Node {
  constructor(i = 0, j = 0) {
    this.i = i;
    this.j = j;
  }

  stringify() {
    return `${this.i} ${this.j}`;
  }
}

function getNumberOfIslands(grid) {
  const m = grid.length;
  const n = grid[0].length;

  const landQueue = new Queue();
  const waterQueue = new Queue();
  const visited = new Set();

  let islands = 0;

  const root = new Node(0, 0);

  const isOutOfBounds = (node) =>
    node.i < 0 || node.j < 0 || node.i >= m || node.j >= n;

  const iterateQueue = ({ queue, type }) => {
    let breakLoop = false;

    for (let index = 0; index < queue.size(); index++) {
      // breakLoop will be set to true if an island node is found while processing the water queue.
      if (breakLoop) break;

      const { i, j } = queue.peek();

      // Possible neighbors for current node
      const neighbors = [
        new Node(i - 1, j),
        new Node(i, j + 1),
        new Node(i + 1, j),
        new Node(i, j - 1),
      ];

      for (let index = 0; index < neighbors.length; index++) {
        const neighbor = neighbors[index];
        const { i, j } = neighbor;

        const nodeString = neighbor.stringify();

        if (isOutOfBounds(neighbor)) {
          continue;
        }

        if (!visited.has(nodeString)) {
          if (grid[i][j] === "1") {
            landQueue.enqueue(neighbor);

            // If a land node is found while processing the water queue, a new island has been found.
            // Increment islands and break out of the loop to start processing the new land.
            if (type === "water") {
              islands++;
              visited.add(nodeString);
              breakLoop = true;
              break;
            }
          } else {
            waterQueue.enqueue(neighbor);
          }
          visited.add(nodeString);
        }
      }

      queue.dequeue();
    }
  };

  // Check the first node
  // "1" = island
  // "0" = water
  if (grid[root.i][root.j] === "1") {
    islands++;
    landQueue.enqueue(root);
  } else {
    waterQueue.enqueue(root);
  }

  visited.add(root.stringify());

  // Traverse the grid using BFS
  while (!landQueue.isEmpty() || !waterQueue.isEmpty()) {
    // Always prioritize land
    const props = !landQueue.isEmpty()
      ? { queue: landQueue, type: "land" }
      : { queue: waterQueue, type: "water" };

    iterateQueue(props);
  }

  return islands;
}

const grid = [
  ["1", "0", "1", "0", "1", "0"],
  ["0", "0", "0", "0", "0", "1"],
  ["1", "0", "1", "0", "1", "0"],
  ["0", "0", "0", "0", "0", "1"],
  ["1", "0", "1", "0", "1", "0"],
];

const islands = getNumberOfIslands(grid);

console.log(islands);
