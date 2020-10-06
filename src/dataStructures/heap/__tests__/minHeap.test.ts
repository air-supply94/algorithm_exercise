import { Comparator } from '../../../utils';
import { MinHeap } from '../minHeap';

describe('MinHeap', () => {
  test('should create an empty min heap', () => {
    const minHeap = new MinHeap();
    expect(minHeap)
      .toBeDefined();
    expect(minHeap.peek())
      .toBeUndefined();
    expect(minHeap.isEmpty())
      .toBe(true);
  });

  test('remove and up', () => {
    const minHeap = new MinHeap();
    minHeap.add(1)
      .add(5)
      .add(3)
      .add(6)
      .add(7)
      .add(8)
      .add(4)
      .removeAll(7);
    expect(minHeap.toString())
      .toBe('1,4,3,6,5,8');
  });

  test('should create min heap from array', () => {
    const minHeap = new MinHeap();
    minHeap.fromArray([
      5,
      3,
      10,
      11,
      1,
    ]);
    expect(minHeap.toString())
      .toBe('1,3,10,11,5');
  });

  test('should add items to the heap and heapify it up', () => {
    const minHeap = new MinHeap();

    minHeap.add(5);
    expect(minHeap.isEmpty())
      .toBe(false);
    expect(minHeap.peek())
      .toBe(5);
    expect(minHeap.toString())
      .toBe('5');

    minHeap.add(3);
    expect(minHeap.peek())
      .toBe(3);
    expect(minHeap.toString())
      .toBe('3,5');

    minHeap.add(10);
    expect(minHeap.peek())
      .toBe(3);
    expect(minHeap.toString())
      .toBe('3,5,10');

    minHeap.add(1);
    expect(minHeap.peek())
      .toBe(1);
    expect(minHeap.toString())
      .toBe('1,3,10,5');

    minHeap.add(1);
    expect(minHeap.peek())
      .toBe(1);
    expect(minHeap.toString())
      .toBe('1,1,10,5,3');

    expect(minHeap.poll())
      .toBe(1);
    expect(minHeap.toString())
      .toBe('1,3,10,5');

    expect(minHeap.poll())
      .toBe(1);
    expect(minHeap.toString())
      .toBe('3,5,10');

    expect(minHeap.poll())
      .toBe(3);
    expect(minHeap.toString())
      .toBe('5,10');
  });

  test('should poll items from the heap and heapify it down', () => {
    const minHeap = new MinHeap();

    minHeap.add(5);
    minHeap.add(3);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(1);

    expect(minHeap.toString())
      .toBe('1,3,10,11,5');

    expect(minHeap.poll())
      .toBe(1);
    expect(minHeap.toString())
      .toBe('3,5,10,11');

    expect(minHeap.poll())
      .toBe(3);
    expect(minHeap.toString())
      .toBe('5,11,10');

    expect(minHeap.poll())
      .toBe(5);
    expect(minHeap.toString())
      .toBe('10,11');

    expect(minHeap.poll())
      .toBe(10);
    expect(minHeap.toString())
      .toBe('11');

    expect(minHeap.poll())
      .toBe(11);
    expect(minHeap.toString())
      .toBe('');

    expect(minHeap.poll())
      .toBeUndefined();
    expect(minHeap.toString())
      .toBe('');
  });

  test('should heapify down through the right branch as well', () => {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);

    expect(minHeap.toString())
      .toBe('3,12,10');

    minHeap.add(11);
    expect(minHeap.toString())
      .toBe('3,11,10,12');

    expect(minHeap.poll())
      .toBe(3);
    expect(minHeap.toString())
      .toBe('10,11,12');
  });

  test('should be possible to find item indices in heap', () => {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(11);

    expect(minHeap.toString())
      .toBe('3,11,10,12,11');

    expect(minHeap.findIndex(5))
      .toBe(-1);
    expect(minHeap.findIndex(3))
      .toBe(0);
    expect(minHeap.findIndex(11))
      .toBe(1);
  });

  test('should be possible to remove items from heap with heapify down', () => {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(12);
    minHeap.add(10);
    minHeap.add(11);
    minHeap.add(11);

    expect(minHeap.toString())
      .toBe('3,11,10,12,11');

    expect(minHeap.removeAll(3))
      .toEqual([3]);

    expect(minHeap.toString())
      .toEqual('10,11,11,12');

    minHeap.removeAll(3);
    expect(minHeap.peek())
      .toEqual(10);

    expect(minHeap.removeAll(11))
      .toEqual([
        11,
        11,
      ]);

    expect(minHeap.toString())
      .toEqual('10,12');

    minHeap.removeAll(3);
    expect(minHeap.peek())
      .toEqual(10);
  });

  test('should be possible to remove items from heap with heapify up', () => {
    const minHeap = new MinHeap();

    minHeap.add(3);
    minHeap.add(10);
    minHeap.add(5);
    minHeap.add(6);
    minHeap.add(7);
    minHeap.add(4);
    minHeap.add(6);
    minHeap.add(8);
    minHeap.add(2);
    minHeap.add(1);

    expect(minHeap.toString())
      .toBe('1,2,4,6,3,5,6,10,8,7');

    expect(minHeap.removeAll(8))
      .toEqual([8]);
    expect(minHeap.removeAll(8))
      .toEqual([]);
    expect(minHeap.toString())
      .toEqual('1,2,4,6,3,5,6,10,7');

    expect(minHeap.removeAll(7))
      .toEqual([7]);
    expect(minHeap
      .toString())
      .toEqual('1,2,4,6,3,5,6,10');

    expect(minHeap.removeAll(1))
      .toEqual([1]);
    expect(minHeap.toString())
      .toEqual('2,3,4,6,10,5,6');

    expect(minHeap.removeAll(2))
      .toEqual([2]);
    expect(minHeap.toString())
      .toEqual('3,6,4,6,10,5');

    expect(minHeap.removeAll(6))
      .toEqual([
        6,
        6,
      ]);
    expect(minHeap.toString())
      .toEqual('3,5,4,10');

    expect(minHeap.removeAll(10))
      .toEqual([10]);
    expect(minHeap.toString())
      .toEqual('3,5,4');

    expect(minHeap.removeAll(5))
      .toEqual([5]);
    expect(minHeap.toString())
      .toEqual('3,4');

    expect(minHeap.removeAll(3))
      .toEqual([3]);
    expect(minHeap.toString())
      .toEqual('4');

    expect(minHeap.removeAll(4))
      .toEqual([4]);
    expect(minHeap.toString())
      .toEqual('');
  });

  test('should be possible to remove items from heap with custom finding comparator', () => {
    const minHeap = new MinHeap();
    minHeap.add('dddd');
    minHeap.add('ccc');
    minHeap.add('bb');
    minHeap.add('a');

    expect(minHeap.toString())
      .toBe('a,bb,ccc,dddd');

    const comparator = new Comparator((a, b) => {
      if (a.length === b.length) {
        return 0;
      }

      return a.length < b.length ? -1 : 1;
    });

    minHeap.removeAll('hey', comparator);
    expect(minHeap.toString())
      .toBe('a,bb,dddd');
  });

  test('should remove values from heap and correctly re-order the tree', () => {
    const minHeap = new MinHeap();

    minHeap.add(1);
    minHeap.add(2);
    minHeap.add(3);
    minHeap.add(4);
    minHeap.add(5);
    minHeap.add(6);
    minHeap.add(7);
    minHeap.add(8);
    minHeap.add(9);

    expect(minHeap.toString())
      .toBe('1,2,3,4,5,6,7,8,9');

    minHeap.removeAll(2);
    expect(minHeap.toString())
      .toBe('1,4,3,8,5,6,7,9');

    minHeap.removeAll(4);
    expect(minHeap.toString())
      .toBe('1,5,3,8,9,6,7');
  });

  test('sort number', () => {
    const minHeap = new MinHeap();
    minHeap.fromArray([
      3,
      4,
      2,
      1,
      0,
      0,
      4,
      3,
      4,
      2,
    ]);
    expect(minHeap.sort())
      .toEqual([
        0,
        0,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        4,
      ]);
  });

  test('sort string', () => {
    const minHeap = new MinHeap();
    minHeap.fromArray([
      3,
      4,
      2,
      1,
      0,
      0,
      4,
      3,
      4,
      2,
    ].map((value) => String(value)));

    expect(minHeap.sort())
      .toEqual([
        0,
        0,
        1,
        2,
        2,
        3,
        3,
        4,
        4,
        4,
      ].map((value) => String(value)));
  });

  test('sort object', () => {
    const arr = [
      { age: 1 },
      { age: 30 },
      { age: 20 },
      { age: 5 },
      { age: 7 },
      { age: 25 },
    ];

    function compareCallback(a, b) {
      if (a.age === b.age) {
        return 0;
      }
      return a.age < b.age ? -1 : 1;
    }

    const minHeap = new MinHeap(compareCallback);
    minHeap.fromArray(arr);
    expect(minHeap.sort())
      .toEqual(
        [
          { age: 1 },
          { age: 5 },
          { age: 7 },
          { age: 20 },
          { age: 25 },
          { age: 30 },
        ]
      );
  });
});