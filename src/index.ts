import fs from 'fs';
import path from 'path';
import { Graph } from './data-structures/graph';
import { SEPARATOR } from './references/constants';

const inputFilePath = path.join(__dirname + "/input.txt");
const vertices: Set<string> = new Set();

fs.readFile(inputFilePath, 'utf-8', (err, data) => {
    if(err) { return console.log('Invalid file.'); }
    data.split(SEPARATOR).forEach(item => { 
        vertices.add(item[0]);
        vertices.add(item[1]);
    });

    const graph = new Graph(vertices);
    data.split(SEPARATOR).forEach((item) => {
        graph.addEdge(item[0], item[1], parseInt(item[2]));
    });

    console.log('Output #1: ', graph.findDistanceForPathString('A-B-C'));
    console.log('Output #2: ', graph.findDistanceForPathString('A-D'));
    console.log('Output #3: ', graph.findDistanceForPathString('A-D-C'));
    console.log('Output #4: ', graph.findDistanceForPathString('A-E-B-C-D'));
    console.log('Output #5: ', graph.findDistanceForPathString('A-E-D'));
    // console.log('Output #6: ', graph.countRoutesWithNStops('C', 'C', 3))
    // console.log('Output #7: ', graph.countRoutesWithNStops('A', 'C', 4, true))
    console.log('Output #8: ', graph.shortestPath('A', 'C'));
    console.log('Output #9: ', graph.shortestPath('B', 'B'));
});