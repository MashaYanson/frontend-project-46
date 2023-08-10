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
  let result = '';
  // eslint-disable-next-line no-restricted-syntax
  for (const node of tree) {
    if (node.status === status.added || node.status === status.deleted) {
      result += `${descriptionMap[node.status](node)}\n`;
    }
    if (node.status === status.changed) {
      result += `${descriptionMap.changed(node)}\n`;
      if (node.hasChildren) {
        result += `${plain(node.value)}`;
      }
    }
    if (node.status === status.unchanged) {
      if (node.hasChildren) {
        result += `${plain(node.value, true)}`;
      }
    }
  }
  return result;
}
export default plain;
