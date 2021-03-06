import { Queue } from '../../../queue';
import { BinarySearchTreeNode, traverseCallback } from '../binarySearchTree';

export function traverseLevelOrder<T = unknown>(
  root: BinarySearchTreeNode<T> | null,
  callback: traverseCallback<T>
): number {
  const queue = new Queue<BinarySearchTreeNode<T>>();
  let level = 0;
  if (root) {
    queue.enqueue(root);
  }

  while (!queue.isEmpty()) {
    const size = queue.size;
    level++;
    for (let i = 0; i < size; i++) {
      const tmpNode = queue.dequeue();
      if (callback(tmpNode, level) === false) {
        return level;
      }

      if (tmpNode.left) {
        queue.enqueue(tmpNode.left);
      }

      if (tmpNode.right) {
        queue.enqueue(tmpNode.right);
      }
    }
  }

  return level;
}
