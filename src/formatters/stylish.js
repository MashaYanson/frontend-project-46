const INDENT = '    ';
const prefixMap = {
  unchanged: `${INDENT.slice(2)}  `,
  deleted: `${INDENT.slice(2)}- `,
  added: `${INDENT.slice(2)}+ `,
  nested: `${INDENT.slice(2)}  `,
};

function indent(depth) {
  return depth ? INDENT.repeat(depth) : '';
}

function stringifyValue(value, depth) {
  if (typeof value === 'object' && !Array.isArray(value) && value !== null) {
    const entries = Object.entries(value)
      .flatMap(([k, v]) => `${indent(depth)}    ${k}: ${stringifyValue(v, depth + 1)}`)
      .join('\n');
    return `{\n${entries}\n${indent(depth)}}`;
  }
  return value;
}

const stylish = (tree) => {
  function convertASTToString(ast, depth = 0) {
    const lines = ast.flatMap((node) => {
      const {
        key, status, value, children, value1, value2,
      } = node;
      switch (status) {
        case 'added':
        case 'deleted':
        case 'unchanged':
          return `${indent(depth)}${prefixMap[status]}${key}: ${stringifyValue(value, depth + 1)}`;
        case 'changed':
          return [
            `${indent(depth)}${prefixMap.deleted}${key}: ${stringifyValue(value1, depth + 1)}`,
            `${indent(depth)}${prefixMap.added}${key}: ${stringifyValue(value2, depth + 1)}`,
          ];
        case 'nested':
          return `${indent(depth)}${prefixMap[status]}${key}: ${convertASTToString(children, depth + 1)}`;
        default:
          throw new Error(`Unknown status: ${status}`);
      }
    });
    return `{\n${lines.join('\n')}\n${indent(depth)}}`;
  }

  return convertASTToString(tree);
};

export default stylish;
