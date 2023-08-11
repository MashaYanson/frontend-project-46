import { status } from '../buildTree.js';

// eslint-disable-next-line no-shadow
const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
    return value;
  }
  return '[complex value]';
};

const descriptionMap = {
  deleted: ({ path }) => `Property '${path}' was removed`,
  added: ({ value, path }) => `Property '${path}' was added with value: ${getValue(value)}`,
  // eslint-disable-next-line max-len
  changed: ({ oldValue, value, path }) => `Property '${path}' was updated. From ${getValue(oldValue)} to ${getValue(value)}`,
};

// найти родителей каждого ключа
function plain(tree) {
  return tree.reduce((acc, node) => {
    if (node.status === status.added || node.status === status.deleted) {
      const item = `${descriptionMap[node.status](node)}\n`;
      return acc + item;
    }
    if (node.status === status.changed) {
      const newAcc = `${acc}${descriptionMap.changed(node)}\n`;
      if (node.hasChildren) {
        const item = `${plain(node.value)}`;
        return newAcc + item;
      }
      return newAcc;
    }
    if (node.status === status.unchanged) {
      if (node.hasChildren) {
        const item = `${plain(node.value)}`;
        return acc + item;
      }
      return acc;
    }
    return acc;
  }, '');
}
export default plain;
