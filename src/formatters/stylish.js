import { status as statuses } from '../buildTree.js';

const SPACING = 4;

const prefixMap = {
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
  clear: '',
};

const getSpacing = (deep, spacing, status) => {
  const generateSpacing = (i, result) => {
    if (i <= 0) {
      return result + prefixMap[status];
    }
    return generateSpacing(i - 1, `${result} `);
  };

  return generateSpacing(deep * spacing - 2, '');
};
const stylish = (tree, deep = 1) => {
  const result = tree.reduce((acc, node) => {
    if (node.status === statuses.changed) {
      // eslint-disable-next-line max-len
      const item1 = `${getSpacing(deep, SPACING, statuses.deleted)}${node.key}: ${node.hasOldChildren ? stylish(node.oldValue, deep + 1) : node.oldValue}\n`;
      // eslint-disable-next-line max-len
      const item2 = `${getSpacing(deep, SPACING, statuses.added)}${node.key}: ${node.hasChildren ? stylish(node.value, deep + 1) : node.value}\n`;
      return acc + item1 + item2;
    }
    // eslint-disable-next-line max-len
    const item = `${getSpacing(deep, SPACING, node.status)}${node.key}: ${node.hasChildren ? stylish(node.value, deep + 1) : node.value}\n`;
    return acc + item;
  }, '{\n');
  return `${result}${getSpacing(deep - 1, 4, deep - 1 ? 'unchanged' : 'clear')}}`;
  // eslint-disable-next-line consistent-return
};
export default stylish;
