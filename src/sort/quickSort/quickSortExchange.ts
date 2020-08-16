import { Comparator, compareFunctionType } from '../../utils';

export function quickSortExchange<T = unknown>(originalArray: T[], comparator: Comparator | compareFunctionType): T[] {
  comparator = new Comparator(comparator);
  if (originalArray.length <= 1) {
    return originalArray;
  }

  const pivotElement = originalArray.splice(originalArray.length / 2 | 0, 1)[0];
  const center = [pivotElement];
  const left = [];
  const right = [];
  while (originalArray.length) {
    const currentElement = originalArray.shift();
    if (comparator.equal(currentElement, pivotElement)) {
      center.push(currentElement);
    } else if (comparator.lessThan(currentElement, pivotElement)) {
      left.push(currentElement);
    } else {
      right.push(currentElement);
    }
  }

  return quickSortExchange(left, comparator)
    .concat(center, quickSortExchange(right, comparator));
}
