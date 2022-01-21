class Adjacent<T> {
  node: Node<T>;
  weight: number;

  constructor(node: Node<T>, weight: number) {
    this.node = node;
    this.weight = weight;
  }
}

export class Node<T> {
  name: T;
  adjacents: Adjacent<T>[];

  constructor(name: T) {
    this.name = name;
    this.adjacents = []
  }

  addAdjacent(node: Node<T>, weight: number): void {
    if(!weight) weight = 0;
    this.adjacents.push({ node, weight });
  }
}