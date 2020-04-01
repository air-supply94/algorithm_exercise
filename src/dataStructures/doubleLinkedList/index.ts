import { DoubleLinkedListNode } from './doubleLinkedListNode';
import {
  Comparator,
  compareFunctionType,
} from '../../utils';
import {
  DoubleLinkedListInterface,
  DoubleLinkedListNodeInterface,
} from './types';

export * from './types';

export class DoubleLinkedList<T = unknown> implements DoubleLinkedListInterface<T> {
  constructor(comparatorFunction?: Comparator | compareFunctionType) {
    this.clear();
    this._compare = new Comparator(comparatorFunction);
  }

  public static formatIndex(index: any, size: number): number {
    const indexInt = index | 0;
    return indexInt < 0 ? indexInt + size : indexInt;
  }

  private readonly _compare: Comparator;
  private _head: DoubleLinkedListNodeInterface<T> | null;
  private _tail: DoubleLinkedListNodeInterface<T> | null;
  private _size: number;

  private deleteValueBase(count: number, value?: T): null | DoubleLinkedListNodeInterface<T> {
    let deleteCount = 0;
    let deletedNode = null;
    while (deleteCount < count && this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.setHead(this.head.next);
      this.setSize(this.size - 1);
      ++deleteCount;
    }

    if (this.head) {
      this.head.setPrevious(null);
    }

    let currentNode = this.head;
    if (currentNode) {
      while (deleteCount < count && currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          if (currentNode.next.next) {
            currentNode.next.next.setPrevious(currentNode);
          }
          ++deleteCount;
          currentNode.setNext(currentNode.next.next);
          this.setSize(this.size - 1);
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (!currentNode || !currentNode.next) {
      this.setTail(currentNode);
    }

    return deletedNode;
  }

  get compare() {
    return this._compare;
  }

  get size(): number {
    return this._size;
  }

  public setSize(size: number): this {
    this._size = size;
    return this;
  }

  get head(): DoubleLinkedListNodeInterface<T> | null {
    return this._head;
  }

  public setHead(head: DoubleLinkedListNodeInterface<T> | null): this {
    this._head = head;
    return this;
  }

  get tail(): DoubleLinkedListNodeInterface<T> | null {
    return this._tail;
  }

  public setTail(tail: DoubleLinkedListNodeInterface<T> | null): this {
    this._tail = tail;
    return this;
  }

  public clear(): this {
    return this.setHead(null)
    .setTail(null)
    .setSize(0);
  }

  public toString(callback?: (value: T) => string): string {
    return this.toArray()
    .map(node => node.toString(callback))
    .toString();
  }

  public toArray(): DoubleLinkedListNodeInterface<T>[] {
    const nodes = [];
    this.eachFromHead(node => {
      nodes.push(node);
    });
    return nodes;
  }

  public eachFromHead(callback: (node: DoubleLinkedListNodeInterface<T>) => void | boolean): this {
    const length = this.size;
    let i = 0;
    let currentNode = this.head;
    while (i < length) {
      const next = currentNode.next;
      if (callback(currentNode) === false) {
        break;
      }
      currentNode = next;
      i++;
    }

    return this;
  }

  public eachFromTail(callback: (node: DoubleLinkedListNodeInterface<T>) => void | boolean): this {
    const length = this.size;
    let i = 0;
    let currentNode = this.tail;
    while (i < length) {
      const next = currentNode.previous;
      if (callback(currentNode) === false) {
        break;
      }
      currentNode = next;
      i++;
    }

    return this;
  }

  public fromArray(values: T[]): this {
    values.forEach(value => this.append(value));
    return this;
  }

  public deleteHead(): null | DoubleLinkedListNodeInterface<T> {
    const deletedHead = this.head;
    if (this.size <= 1) {
      this.clear();
    } else {
      this.setHead(this.head.next);
      this.head.setPrevious(null);
      this.setSize(this.size - 1);
    }

    return deletedHead;
  }

  public deleteTail(): null | DoubleLinkedListNodeInterface<T> {
    const deletedTail = this.tail;
    if (this.size <= 1) {
      this.clear();
    } else {
      this.setTail(this.tail.previous);
      this.tail.setNext(null);
      this.setSize(this.size - 1);
    }

    return deletedTail;
  }

  public find(findParams: { value?: T; callback?: (value: T) => boolean }): null | DoubleLinkedListNodeInterface<T> {
    const {value, callback = {}} = findParams;
    let findNode = null;
    this.eachFromHead(node => {
      if ((typeof callback === 'function' && callback(node.value)) || this.compare.equal(node.value, value)) {
        findNode = node;
        return false;
      }
      return true;
    });

    return findNode;
  }

  public deleteAll(value?: T): null | DoubleLinkedListNodeInterface<T> {
    return this.deleteValueBase(Infinity, value);
  }

  public delete(value?: T): null | DoubleLinkedListNodeInterface<T> {
    return this.deleteValueBase(1, value);
  }

  public deleteIndex(index: number): null | DoubleLinkedListNodeInterface<T> {
    const node = this.get(index);

    if (node === this.head) {
      return this.deleteHead();
    }

    if (node === this.tail) {
      return this.deleteTail();
    }

    if (node) {
      node.next.setPrevious(node.previous);
      node.previous.setNext(node.next);
      this.setSize(this.size - 1);
    }

    return node;
  }

  public get(index: number): null | DoubleLinkedListNodeInterface<T> {
    const position = DoubleLinkedList.formatIndex(index, this.size);

    if (position < 0 || position >= this.size) {
      return null;
    }

    let i = 0;
    let findNode = null;
    const middle = this.size / 2 >>> 0;
    if (this.size > 10 && position >= middle) {
      this.eachFromTail(node => {
        if (this.size - 1 - i === position) {
          findNode = node;
          return false;
        }
        ++i;
        return true;
      });
    } else {
      this.eachFromHead(node => {
        if (i === position) {
          findNode = node;
          return false;
        }
        i++;
        return true;
      });
    }
    return findNode;
  }

  public insert(value: T, index: number): this {
    const position = DoubleLinkedList.formatIndex(index, this.size);
    if (position <= 0) {
      return this.prepend(value);
    } else if (position >= this.size) {
      return this.append(value);
    }

    const oldPositionNode = this.get(index) as DoubleLinkedListNodeInterface<T>;
    const newPositionNode = new DoubleLinkedListNode(value, oldPositionNode, oldPositionNode.previous);
    oldPositionNode.previous.setNext(newPositionNode);
    oldPositionNode.setPrevious(newPositionNode);
    return this.setSize(this.size + 1);
  }

  public append(value: T): this {
    const newNode = new DoubleLinkedListNode(value, null, this.tail);

    if (this.isEmpty()) {
      this.setTail(newNode)
      .setHead(newNode);
    } else {
      this.tail.setNext(newNode);
      this.setTail(newNode);
    }
    this.setSize(this.size + 1);

    return this;
  }

  public prepend(value: T): this {
    const newNode = new DoubleLinkedListNode(value, this.head);
    if (this.isEmpty()) {
      this.setHead(newNode)
      .setTail(newNode);
    } else {
      this.head.setPrevious(newNode);
      this.setHead(newNode);
    }
    this.setSize(this.size + 1);

    return this;
  }

  public reverse(): this {
    let current = this.head;
    this.setHead(this.tail);
    this.setTail(current);
    let previous: DoubleLinkedListNodeInterface<T> = null;
    let next: DoubleLinkedListNodeInterface<T> = null;
    while (current) {
      next = current.next;
      current.setNext(previous)
      .setPrevious(next);
      previous = current;
      current = next;
    }
    return this;
  }

  public connect(...arg: DoubleLinkedListInterface<T>[]): this {
    const values = [];
    arg.forEach(doubleLinkedList => {
      doubleLinkedList.eachFromHead(node => {
        values.push(node.value);
      });
    });

    return this.fromArray(values);
  }

  public has(value?: T): boolean {
    return !!this.find({value});
  }

  public isEmpty(): boolean {
    return this.size <= 0;
  }
}
