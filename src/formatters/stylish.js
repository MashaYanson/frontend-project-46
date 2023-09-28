const prefixMap = {
  unchanged: '    ',
  deleted: '  - ',
  added: '  + ',
  nested: '    ',
};
function indent(depth) {
  return depth ? '    '.repeat(depth) : '';
}


function stringifyValue(value, depth) {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    const entries = Object.entries(value)
      .map(([k, v]) => `${indent(depth)}    ${k}: ${stringifyValue(v, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${indent(depth)}}`;
  }
  return value;
}
const stylish = (tree) => {
  function convertASTToString(ast, depth = 0) {
    const lines = ast.map((node) => {
      const {
        key, status, value, children, value1, value2,
      } = node;
      switch (status) {
        case 'added':
        case 'deleted':
        case 'unchanged':
          return `${indent(depth)}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
        case 'changed':
          // eslint-disable-next-line max-len
          return `${indent(depth)}${prefixMap.deleted}${key}: ${stringifyValue(value1, depth + 1)}\n${indent(depth)}${prefixMap.added}${key}: ${stringifyValue(value2, depth + 1)}`;

        case 'nested':
          return `${indent(depth)}${prefixMap[status]}${key}: ${convertASTToString(children, depth + 1)}`;
        default:
          return `${indent(depth)}${prefixMap.nested}${key}: ${stringifyValue(value, depth + 1)}`;
      }
    });
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`;
  }

  return convertASTToString(tree);
};
export default stylish;
