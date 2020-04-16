import { QueueInterface } from './types';
import {
  DoubleLinkedList,
  DoubleLinkedListInterface,
  toStringCallback,
} from '../doubleLinkedList/';

export class Queue<T = unknown> implements QueueInterface<T> {
  constructor() {
    this._doubleLinkedList = new DoubleLinkedList<T>();
  }

  private readonly _doubleLinkedList: DoubleLinkedListInterface<T>;

  private get doubleLinkedList() {
    return this._doubleLinkedList;
  }

  get size(): number {
    return this.doubleLinkedList.size;
  }

  public toString(callback?: toStringCallback<T>): string {
    return this.doubleLinkedList.toString(callback);
  }

  public toArray(): T[] {
    const values = [];
    this.doubleLinkedList.eachFromHead(node => {
      values.push(node.value);
    });
    return values;
  }

  public dequeue(): T | null {
    return this.isEmpty() ? null : this.doubleLinkedList.deleteHead().value;
  }

  public enqueue(value: T): T {
    return this.doubleLinkedList.append(value).value;
  }

  public peek(): T | null {
    return this.isEmpty() ? null : this.doubleLinkedList.head.value;
  }

  public clear(): this {
    this.doubleLinkedList.clear();
    return this;
  }

  public has(value?: T): boolean {
    return this.doubleLinkedList.has(value);
  }

  public isEmpty(): boolean {
    return this.doubleLinkedList.isEmpty();
  }
}
