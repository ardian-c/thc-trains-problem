import { Graph } from "../data-structures/graph";
import { SEPARATOR } from "../references/constants";

describe(" Graph data structure ", () => {
  const vertices: Set<string> = new Set();
  const data = "AB5, BC4, CD8, DC8, DE6, AD5, CE2, EB3, AE7";
  data.split(SEPARATOR).forEach((item) => {
    vertices.add(item[0]);
    vertices.add(item[1]);
  });
  const graph = new Graph(vertices);
  data.split(SEPARATOR).forEach((item) => {
    graph.addEdge(item[0], item[1], parseInt(item[2]));
  });

  describe("Find distance for path string", () => {
    it("should return 9 for the given string path A-B-C", () => {
      expect(graph.findDistanceForPathString("A-B-C")).toBe(9);
    });

    it("should return 5 for the given string path A-D", () => {
      expect(graph.findDistanceForPathString("A-D")).toBe(5);
    });
  });
});
