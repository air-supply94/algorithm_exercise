interface TreeNode {
  val: number;
  left: TreeNode | null;
  right: TreeNode | null;
}

// https://leetcode-cn.com/problems/minimum-depth-of-binary-tree/
// 111
export function minDepth(root: TreeNode | null): number {
  const queue: TreeNode[] = [];
  let level = 0;

  if (root) {
    queue.push(root);
  }

  while (queue.length) {
    level++;
    const size = queue.length;

    for (let i = 0; i < size; i++) {
      const currentNode = queue.shift();

      if (!currentNode.left && !currentNode.right) {
        return level;
      }

      if (currentNode.left) {
        queue.push(currentNode.left);
      }

      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  }

  return level;
}
