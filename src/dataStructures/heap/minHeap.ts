import { Heap } from './heap';
import { InterfaceMinHeap } from './@types';
import {
  Comparator,
  compareFunctionType,
} from '../../utils/comparator';

export class MinHeap<T> extends Heap<T> implements InterfaceMinHeap<T> {
  constructor(comparatorFunction?: Comparator | compareFunctionType) {
    super(comparatorFunction);
  }

  public pairIsInCorrectOrder(parentElement: T, childElement: T): boolean {
    return this.compare.lessThanOrEqual(parentElement, childElement);
  }
}
