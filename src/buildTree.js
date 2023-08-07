const SPACING = 4;
const prefixMap = {
  unchanged: '  ',
  deleted: '- ',
  added: '+ ',
  clear: '',
};
const getSpacing = (deep, spacing, status) => {
  let i = deep * spacing - 2;
  let result = '';

  while (i > 0) {
    result += ' ';
    i -= 1;
  }
  result += prefixMap[status];
  return result;
};
const buildTree = (tree, deep = 1) => {
  let result = '{\n';

  tree.forEach((node) => {
    result += `${getSpacing(deep, SPACING, node.status)}${node.key}: ${node.hasChildren ? buildTree(node.value, deep + 1) : node.value}\n`;
  });

  result += `${getSpacing(deep - 1, 4, deep - 1 ? 'unchanged' : 'clear')}}`;
  return result;
};
export default buildTree;
