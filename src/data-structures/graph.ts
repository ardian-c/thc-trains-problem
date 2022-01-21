import { Node } from "./node";

export class Graph<T> {
    vertices: Set<T|string> = new Set();
    nodes: Map<T, Node<T>> = new Map();
    adjacencyMatrix: number[]|any = [];

    constructor(vertices: Set<T>) {
        this.vertices = vertices;
        for(let i = 0; i < vertices.size; i++) {
            this.adjacencyMatrix.push([]);
            for(let j = 0; j < vertices.size; j++) {
                this.adjacencyMatrix[i][j] = Infinity;
            }
        }
    }

    addNode(data: T): Node<T> {
        let node = this.nodes.get(data);
        if(node) return node;

        node = new Node(data);
        this.nodes.set(data, node);

        return node;
    }

    addEdge(source: T, destination: T, weight: number): void {
        const sourceNode = this.addNode(source);
        const destinationNode = this.addNode(destination);

        sourceNode.addAdjacent(destinationNode, weight);
        if(source !== destination) {
            const vertices = [...this.vertices];
            const sourceIndex = vertices.indexOf(source);
            const destinationIndex = vertices.indexOf(destination);
            if(sourceIndex !== -1 && destinationIndex !== -1) {
                this.adjacencyMatrix[sourceIndex][destinationIndex] = weight;
                // this.adjacencyMatrix[destinationIndex][sourceIndex] = weight;
            }
        }
    }

    findDistanceForPathString(path: string):number|string {
        const vertices = [...this.vertices];
        const routes = path.split('-');
        let distance = 0;
        for(let i = 0; i < routes.length - 1; i++) {
            const sourceIndex = vertices.indexOf(routes[i]);
            const destinationIndex = vertices.indexOf(routes[i+1]);
            distance += this.adjacencyMatrix[sourceIndex][destinationIndex];
            // console.log(':: Distance between :: ', routes[i], routes[i+1], distance);
        }

        if(distance === Infinity) { return 'NO SUCH ROUTE'; }

        return distance;
    }

    printFullGraph() {
        this.nodes.forEach((node) => {
            console.log('==========================================================');
            console.log('🏁', node);
            if(node.adjacents.length > 0) {
                node.adjacents.forEach((adjacent) => {
                    console.log('🚧', adjacent);
                });
            }
            console.log('==========================================================');
        });
    }
}