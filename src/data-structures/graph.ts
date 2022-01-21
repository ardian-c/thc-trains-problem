import { Node } from "./node";
import { Queue } from "./queue";

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

    // Dijkstra shortest path algorithm
    shortestPath(start: string, destination: string) {
        let verticesNr = this.vertices.size;
        const startIndex = [...this.vertices].indexOf(start);
        const destinationIndex = [...this.vertices].indexOf(destination); 
        let shortestDistances = new Array(verticesNr);
        let visited = new Array(verticesNr);
        
        for(let i = 0; i < verticesNr; i++) {
            shortestDistances[i] = Infinity;
            visited[verticesNr] = false;
        }
        // distance to self, 0
        shortestDistances[startIndex] = 0;
        let parents = new Array(verticesNr);
        parents[startIndex] = -1;

        for(let i = 1; i < verticesNr; i++) {
            let nearestVertex = -1;
            let shortestDistance = Infinity;
            for(let j = 0; j < verticesNr; j++) {
                if(!visited[j] && shortestDistances[j] < shortestDistance) {
                    nearestVertex = j;
                    shortestDistance = shortestDistances[j];
                }
            }
            visited[nearestVertex] = true;

            for(let vIndex = 0; vIndex < verticesNr; vIndex++) {
                let edgeDistance = this.adjacencyMatrix[nearestVertex][vIndex];

                if(edgeDistance > 0 && ((shortestDistance + edgeDistance) < shortestDistances[vIndex])) {
                    parents[vIndex] = nearestVertex;
                    shortestDistances[vIndex] = shortestDistance + edgeDistance;
                }
            }
        }
        // TODO: handle cyclic paths, B -> B currently returns 0, as distance to itself is 0. 
        return shortestDistances[destinationIndex];
    }

    countRoutesWithNStops(start:string, destination:string, stops:number):number {
        // TODO: check how many routes exists with start and destination and have less than N stops
        return 0;
    }

    findDistanceForPathString(path: string):number|string {
        const vertices = [...this.vertices];
        const routes = path.split('-');
        let distance = 0;
        for(let i = 0; i < routes.length - 1; i++) {
            const sourceIndex = vertices.indexOf(routes[i]);
            const destinationIndex = vertices.indexOf(routes[i+1]);
            distance += this.adjacencyMatrix[sourceIndex][destinationIndex];
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