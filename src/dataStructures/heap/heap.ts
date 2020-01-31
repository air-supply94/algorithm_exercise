/**
 * Created by joey on 2018/10/25
 */
import { Comparator } from '../../utils/comparator';
import swap from '../../utils/swap';
import { compareFunctionType } from '../../utils/@types';
import { InterfaceHeap } from './@types';

export default abstract class Heap implements InterfaceHeap {
  protected constructor(comparatorFunction?: Comparator | compareFunctionType) {
    this.heapContainer = [];
    this.compare = comparatorFunction instanceof Comparator ? comparatorFunction : new Comparator(comparatorFunction);
  }

  private heapContainer;
  private compare;

  public abstract pairIsInCorrectOrder(firstElement, secondElement): boolean;

  public fromArray(value) {
    value.forEach(val => this.add(val));
    return this;
  }

  public sort() {
    const sortArray: any[] = [];
    while (!this.isEmpty()) {
      sortArray.push(this.poll());
    }
    this.heapContainer = sortArray;
    return sortArray;
  }

  public getLeftChildIndex(parentIndex) {
    return 2 * parentIndex + 1;
  }

  public getRightChildIndex(parentIndex) {
    return 2 * parentIndex + 2;
  }

  public getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  public hasParent(childIndex) {
    return this.getParentIndex(childIndex) > -1 && this.getParentIndex(childIndex) < this.heapContainer.length;
  }

  public hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) > 0 && this.getLeftChildIndex(parentIndex) < this.heapContainer.length;
  }

  public hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) > 0 && this.getRightChildIndex(parentIndex) < this.heapContainer.length;
  }

  public leftChild(parentIndex) {
    return this.heapContainer[this.getLeftChildIndex(parentIndex)];
  }

  public rightChild(parentIndex) {
    return this.heapContainer[this.getRightChildIndex(parentIndex)];
  }

  public parent(childIndex) {
    return this.heapContainer[this.getParentIndex(childIndex)];
  }

  public peek() {
    return this.heapContainer[0];
  }

  public poll() {
    if (this.heapContainer.length <= 1) {
      return this.heapContainer.pop();
    }
    const item = this.heapContainer[0];
    this.heapContainer[0] = this.heapContainer.pop();
    this.down();
    return item;
  }

  public add(item) {
    this.heapContainer.push(item);
    return this.up();
  }

  public findIndex(item, comparator = this.compare, fromIndex = 0) {
    return this.heapContainer.findIndex((value) => comparator.equal(item, value), fromIndex);
  }

  public isEmpty() {
    return this.heapContainer.length === 0;
  }

  public toString() {
    return this.heapContainer.toString();
  }

  public remove(item, comparator) {
    let removeIndex = this.findIndex(item, comparator);
    while (removeIndex !== -1) {
      if (removeIndex === this.heapContainer.length - 1) {
        this.heapContainer.pop();
        break;
      } else {
        this.heapContainer[removeIndex] = this.heapContainer.pop();
        if (this.hasLeftChild(removeIndex) && (!this.hasParent(removeIndex) || this.pairIsInCorrectOrder(this.parent(removeIndex), this.heapContainer[removeIndex]))) {
          this.down(removeIndex);
        } else {
          this.up(removeIndex);
        }
        removeIndex = this.findIndex(item, comparator);
      }
    }
    return this;
  }

  public up(customStartIndex = this.heapContainer.length - 1) {
    while (this.hasParent(customStartIndex) && !this.pairIsInCorrectOrder(this.parent(customStartIndex), this.heapContainer[customStartIndex])) {
      swap(this.heapContainer, customStartIndex, this.getParentIndex(customStartIndex));
      customStartIndex = this.getParentIndex(customStartIndex);
    }
    return this;
  }

  public down(customStartIndex = 0) {
    let nextIndex: number;
    while (this.hasLeftChild(customStartIndex)) {
      nextIndex = this.hasRightChild(customStartIndex) && this.pairIsInCorrectOrder(this.rightChild(customStartIndex), this.leftChild(customStartIndex))
        ? this.getRightChildIndex(customStartIndex)
        : this.getLeftChildIndex(customStartIndex);
      if (this.pairIsInCorrectOrder(this.heapContainer[customStartIndex], this.heapContainer[nextIndex])) {
        break;
      }
      swap(this.heapContainer, customStartIndex, nextIndex);
      customStartIndex = nextIndex;
    }
    return this;
  }
}
