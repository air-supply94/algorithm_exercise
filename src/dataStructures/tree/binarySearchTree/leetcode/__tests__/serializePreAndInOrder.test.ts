import { serializePreAndInOrder } from '../serializePreAndInOrder';

describe('serializePreAndInOrder', () => {
  test('should serializePreAndInOrder', () => {
    expect(serializePreAndInOrder([], []))
      .toBeNull();
    expect(serializePreAndInOrder([1], [1]).value)
      .toBe(1);

    const node1 = serializePreAndInOrder([
      2,
      1,
      3,
    ], [
      1,
      2,
      3,
    ]);

    expect(node1.value).toBe(2);
    expect(node1.left.value).toBe(1);
    expect(node1.right.value).toBe(3);
    expect(node1.toString()).toBe('1,2,3');

    const node2 = serializePreAndInOrder([
      3,
      2,
      1,
      4,
      5,
    ], [
      1,
      2,
      3,
      4,
      5,
    ]);

    expect(node2.value).toBe(3);
    expect(node2.left.value).toBe(2);
    expect(node2.right.value).toBe(4);
    expect(node2.toString()).toBe('1,2,3,4,5');
  });
});