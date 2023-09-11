const prefixMap = {
  unchanged: '    ',
  deleted: '  - ',
  added: '  + ',
  nested: '    ',
};

function stringifyValue(value, depth) {
  const indent = depth ? '    '.repeat(depth) : '';
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    const entries = Object.entries(value)
      .map(([k, v]) => `${indent}    ${k}: ${stringifyValue(v, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${indent}}`;
  }
  return value;
}
const stylish = (tree) => {
  function convertASTToString(ast, depth = 0) {
    const indent = depth ? '    '.repeat(depth) : '';
    const lines = ast.map((node) => {
      const {
        key, status, value, children,
      } = node;
      switch (status) {
        case 'added':
          return `${indent}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
        case 'deleted':
          return `${indent}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
        case 'changed':
          // eslint-disable-next-line max-len
          return `${indent}${prefixMap.deleted}${key}: ${stringifyValue(value.old, depth + 1)}\n${indent}${prefixMap.added}${key}: ${stringifyValue(value.new, depth + 1)}`;
        case 'unchanged':
          return `${indent}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
        case 'nested':
          return `${indent}${prefixMap[status]}${key}: ${convertASTToString(children, depth + 1)}`;
        default:
          return `${indent}${prefixMap.nested}${key}: ${stringifyValue(value, depth + 1)}`;
      }
    });
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`;
  }

  return convertASTToString(tree);
};
export default stylish;
