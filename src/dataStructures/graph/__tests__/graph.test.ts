import { Graph } from '../graph';
import { GraphEdge } from '../graphEdge';
import { GraphVertex } from '../graphVertex';

describe('Graph', () => {
  test('should add vertices to graph', () => {
    const graph = new Graph();
    expect(graph.getNeighbors('aaa')).toEqual([]);
    expect(graph.getEdge('aaa')).toBeNull();
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    graph.addVertex(vertexA);
    graph.addVertex(vertexB);
    expect(graph.addVertex(vertexA))
      .toBe(vertexA);
    expect(graph.addVertex(vertexB))
      .toBe(vertexB);

    expect(graph.toString())
      .toBe('A,B');
    expect(graph.getVertex(vertexA.value))
      .toEqual(vertexA);
    expect(graph.getVertex(vertexB.value))
      .toEqual(vertexB);
  });

  test('should add edges to undirected graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    expect(graph.getAllVertices().length)
      .toBe(2);
    expect(graph.getAllVertices()[0])
      .toEqual(vertexA);
    expect(graph.getAllVertices()[1])
      .toEqual(vertexB);

    const graphVertexA = graph.getVertex(vertexA.value);
    const graphVertexB = graph.getVertex(vertexB.value);

    expect(graph.toString())
      .toBe('A,B');
    expect(graphVertexA)
      .toBeDefined();
    expect(graphVertexB)
      .toBeDefined();

    expect(graph.getVertex('not existing'))
      .toBeNull();
    expect(graph.getVertex('toString'))
      .toBeNull();

    expect(graphVertexA.getNeighbors().length)
      .toBe(1);
    expect(graphVertexA.getNeighbors()[0])
      .toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0])
      .toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length)
      .toBe(1);
    expect(graphVertexB.getNeighbors()[0])
      .toEqual(vertexA);
    expect(graphVertexB.getNeighbors()[0])
      .toEqual(graphVertexA);
  });

  test('should add edges to directed graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);

    const graphVertexA = graph.getVertex(vertexA.value);
    const graphVertexB = graph.getVertex(vertexB.value);

    expect(graph.toString())
      .toBe('A,B');
    expect(graphVertexA)
      .toBeDefined();
    expect(graphVertexB)
      .toBeDefined();

    expect(graphVertexA.getNeighbors().length)
      .toBe(1);
    expect(graphVertexA.getNeighbors()[0])
      .toEqual(vertexB);
    expect(graphVertexA.getNeighbors()[0])
      .toEqual(graphVertexB);

    expect(graphVertexB.getNeighbors().length)
      .toBe(0);
  });

  test('should find edge by vertices in undirected graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    expect(graphEdgeAC)
      .toBeNull();
    expect(graphEdgeCA)
      .toBeNull();
    expect(graphEdgeAB)
      .toEqual(edgeAB);
    expect(graphEdgeBA)
      .toEqual(edgeAB);
    expect(graphEdgeAB.weight)
      .toBe(10);
  });

  test('should find edge by vertices in directed graph', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB, 10);

    graph.addEdge(edgeAB);

    const graphEdgeAB = graph.findEdge(vertexA, vertexB);
    const graphEdgeBA = graph.findEdge(vertexB, vertexA);
    const graphEdgeAC = graph.findEdge(vertexA, vertexC);
    const graphEdgeCA = graph.findEdge(vertexC, vertexA);

    expect(graphEdgeAC)
      .toBeNull();
    expect(graphEdgeCA)
      .toBeNull();
    expect(graphEdgeBA)
      .toBeNull();
    expect(graphEdgeAB)
      .toEqual(edgeAB);
    expect(graphEdgeAB.weight)
      .toBe(10);
  });

  test('should return vertex neighbors', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeAC);

    const neighbors = graph.getNeighbors(vertexA);

    expect(neighbors.length)
      .toBe(2);
    expect(neighbors[0])
      .toEqual(vertexB);
    expect(neighbors[1])
      .toEqual(vertexC);
  });

  test('should add edge twice', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');

    const edgeAB = new GraphEdge(vertexA, vertexB);

    graph.addEdge(edgeAB);
    expect(graph.addEdge(edgeAB))
      .toEqual(edgeAB);
    expect(graph.addEdge(edgeAB).startVertex)
      .toBe(vertexA);
    expect(graph.addEdge(edgeAB).endVertex)
      .toBe(vertexB);
  });

  test('should return the list of all added edges', () => {
    const graph = new Graph(true);

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);

    const edges = graph.getAllEdges();

    expect(edges.length)
      .toBe(2);
    expect(edges[0])
      .toEqual(edgeAB);
    expect(edges[1])
      .toEqual(edgeBC);
  });

  test('should calculate total graph weight for default graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeAD = new GraphEdge(vertexA, vertexD);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeCD);
    graph.addEdge(edgeAD);

    expect(graph.getWeight())
      .toBe(0);
  });

  test('should calculate total graph weight for weighted graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 1);
    const edgeBC = new GraphEdge(vertexB, vertexC, 2);
    const edgeCD = new GraphEdge(vertexC, vertexD, 3);
    const edgeAD = new GraphEdge(vertexA, vertexD, 4);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeCD);
    graph.addEdge(edgeAD);

    expect(graph.getWeight())
      .toBe(10);
  });

  test('should be possible to delete edges from graph', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeAC = new GraphEdge(vertexA, vertexC);

    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeAC);

    expect(graph.getAllEdges().length)
      .toBe(3);

    graph.deleteEdge(edgeAB);

    expect(graph.getAllEdges().length)
      .toBe(2);
    expect(graph.getAllEdges()[0]
      .value)
      .toBe(edgeBC.value);
    expect(graph.getAllEdges()[1]
      .value)
      .toBe(edgeAC.value);
  });

  test('should should throw an error when trying to delete not existing edge', () => {
    const graph = new Graph();

    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    graph.addEdge(edgeAB);

    expect(graph.deleteEdge(edgeBC))
      .toBeNull();
  });

  test('should be possible to reverseBetween graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeAC = new GraphEdge(vertexA, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);

    const graph = new Graph(true);
    graph.addEdge(edgeAB);
    graph.addEdge(edgeAC);
    graph.addEdge(edgeCD);

    expect(graph.toString())
      .toBe('A,B,C,D');

    expect(graph.getAllEdges().length)
      .toBe(3);
    expect(graph.getNeighbors(vertexA).length)
      .toBe(2);
    expect(graph.getNeighbors(vertexA)[0]
      .value)
      .toBe(vertexB.value);
    expect(graph.getNeighbors(vertexA)[1]
      .value)
      .toBe(vertexC.value);
    expect(graph.getNeighbors(vertexB).length)
      .toBe(0);
    expect(graph.getNeighbors(vertexC).length)
      .toBe(1);
    expect(graph.getNeighbors(vertexC)[0]
      .value)
      .toBe(vertexD.value);
    expect(graph.getNeighbors(vertexD).length)
      .toBe(0);

    graph.reverse();

    expect(graph.toString())
      .toBe('A,B,C,D');
    expect(graph.getAllEdges().length)
      .toBe(3);
    expect(graph.getNeighbors(vertexA).length)
      .toBe(0);
    expect(graph.getNeighbors(vertexB).length)
      .toBe(1);
    expect(graph.getNeighbors(vertexB)[0]
      .value)
      .toBe(vertexA.value);
    expect(graph.getNeighbors(vertexC).length)
      .toBe(1);
    expect(graph.getNeighbors(vertexC)[0]
      .value)
      .toBe(vertexA.value);
    expect(graph.getNeighbors(vertexD).length)
      .toBe(1);
    expect(graph.getNeighbors(vertexD)[0]
      .value)
      .toBe(vertexC.value);
  });

  test('should return vertices indices', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeCD);
    graph.addEdge(edgeBD);

    const verticesIndices = graph.getVerticesIndices();
    expect(verticesIndices)
      .toEqual({
        A: 0,
        B: 1,
        C: 2,
        D: 3,
      });
  });

  test('should generate adjacency matrix for undirected graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB);
    const edgeBC = new GraphEdge(vertexB, vertexC);
    const edgeCD = new GraphEdge(vertexC, vertexD);
    const edgeBD = new GraphEdge(vertexB, vertexD);

    const graph = new Graph();
    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeCD);
    graph.addEdge(edgeBD);

    const adjacencyMatrix = graph.getAdjacencyMatrix();
    expect(adjacencyMatrix)
      .toEqual([
        [
          Infinity,
          0,
          Infinity,
          Infinity,
        ],
        [
          0,
          Infinity,
          0,
          0,
        ],
        [
          Infinity,
          0,
          Infinity,
          0,
        ],
        [
          Infinity,
          0,
          0,
          Infinity,
        ],
      ]);
  });

  test('should generate adjacency matrix for directed graph', () => {
    const vertexA = new GraphVertex('A');
    const vertexB = new GraphVertex('B');
    const vertexC = new GraphVertex('C');
    const vertexD = new GraphVertex('D');

    const edgeAB = new GraphEdge(vertexA, vertexB, 2);
    const edgeBC = new GraphEdge(vertexB, vertexC, 1);
    const edgeCD = new GraphEdge(vertexC, vertexD, 5);
    const edgeBD = new GraphEdge(vertexB, vertexD, 7);

    const graph = new Graph(true);
    graph.addEdge(edgeAB);
    graph.addEdge(edgeBC);
    graph.addEdge(edgeCD);
    graph.addEdge(edgeBD);

    const adjacencyMatrix = graph.getAdjacencyMatrix();
    expect(adjacencyMatrix)
      .toEqual([
        [
          Infinity,
          2,
          Infinity,
          Infinity,
        ],
        [
          Infinity,
          Infinity,
          1,
          7,
        ],
        [
          Infinity,
          Infinity,
          Infinity,
          5,
        ],
        [
          Infinity,
          Infinity,
          Infinity,
          Infinity,
        ],
      ]);
  });
});
