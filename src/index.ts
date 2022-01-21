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

    console.log('1. Distance for A-B-C graph: ', graph.findDistanceForPathString('A-B-C'));
    console.log('2. Distance for A-D graph: ', graph.findDistanceForPathString('A-D'));
    console.log('3. Distance for A-D-C graph: ', graph.findDistanceForPathString('A-D-C'));
    console.log('4. Distance for A-E-B-C-D graph: ', graph.findDistanceForPathString('A-E-B-C-D'));
    console.log('5. Distance for A-E-D graph: ', graph.findDistanceForPathString('A-E-D'));
});