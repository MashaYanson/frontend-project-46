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
      let line = '';
      switch (status) {
        case 'added':
          line = `${indent}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
          break;
        case 'deleted':
          line = `${indent}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
          break;
        case 'changed':
          line = `${indent}${prefixMap.deleted}${key}: ${stringifyValue(value.old, depth + 1)}\n`;
          line += `${indent}${prefixMap.added}${key}: ${stringifyValue(value.new, depth + 1)}`;
          break;
        case 'nested':
          line = `${indent}${prefixMap[status]}${key}: ${convertASTToString(children, depth + 1)}`;
          break;
        default:
          line = `${indent}${prefixMap.nested}${key}: ${stringifyValue(value, depth + 1)}`;
          break;
      }
      return `${line}`;
    });
    return `{\n${lines.join('\n')}\n${'    '.repeat(depth)}}`;
  }

  return convertASTToString(tree);
};
export default stylish;
