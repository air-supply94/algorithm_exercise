import { LRUCache } from '../LRUCache';

test('LRUCache', () => {
  const lRUCache = new LRUCache(2);

  lRUCache.put(1, 1);
  lRUCache.put(2, 2);
  expect(lRUCache.get(1))
    .toBe(1);
  lRUCache.put(3, 3);
  expect(lRUCache.get(2))
    .toBe(-1);
  lRUCache.put(4, 4);
  lRUCache.put(4, 5);
  expect(lRUCache.get(1))
    .toBe(-1);
  expect(lRUCache.get(3))
    .toBe(3);
  expect(lRUCache.get(4))
    .toBe(5);
});