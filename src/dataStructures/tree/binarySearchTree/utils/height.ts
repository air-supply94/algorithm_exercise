import { BinarySearchTreeNodeInterface } from '../types';
import { traverseLevelOrder } from './traverseLevelOrder';

export function getHeight<T = unknown>(root: BinarySearchTreeNodeInterface<T>): number {
  const level = traverseLevelOrder(root, (x) => true);

  return level <= 1 ? 0 : level - 1;
}

export function getBalanceFactor<T = unknown>(root: BinarySearchTreeNodeInterface<T>): number {
  return root ? traverseLevelOrder(root.left, (x) => true) - traverseLevelOrder(root.right, (x) => true) : 0;
}
