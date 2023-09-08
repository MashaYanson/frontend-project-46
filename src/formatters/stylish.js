// import _ from 'lodash';
// import { status as statuses } from '../buildTree.js';

// const SPACING = 4;

const prefixMap = {
  unchanged: '    ',
  deleted: '  - ',
  added: '  + ',
  nested: '    ',
};

// const getSpacing = (deep, spacing, status) => {
//   const generateSpacing = (i, result) => {
//     if (i <= 0) {
//       return result + prefixMap[status];
//     }
//     return generateSpacing(i - 1, `${result} `);
//   };
//
//   return generateSpacing(deep * spacing - 2, '');
// };

// return `${diff}\n${startIndent(depth)}${sings.removed}${key}: ${buildValue(value.oldValue)}\n${startIndent(depth)}${
//   sings.added
// }${key}: ${buildValue(value.newValue)}`;
// }
// function stringifyObject(obj, indent = '') {
//   if (typeof obj !== 'object' || obj === null) {
//     // Если объект не является объектом или null, вернуть его строковое представление
//     return String(obj);
//   }
//
//   const keys = Object.keys(obj);
//
//   if (keys.length === 0) {
//     // Если объект не имеет свойств, вернуть пустой объект
//     return '{}';
//   }
//
//   const result = keys.map((key) => {
//     const value = obj[key];
//     const formattedValue = typeof value === 'object' && value !== null
//       ? stringifyObject(value, `${indent}  `)
//       : String(value);
//
//     return `${indent}${key}: ${formattedValue}`;
//   });
//
//   return `{\n${result.join(',\n')}\n${indent.slice(0, -2)}}`;
// }

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
      const { key, status, value } = node;
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
          line = `${indent}${prefixMap[status]}${key}: ${convertASTToString(value, depth + 1)}`;
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

  // const result = tree.reduce((acc, node) => {
  // eslint-disable-next-line max-len
  //   const buildValue = (val) => (_.isPlainObject(val) ? stringifyObject(val, getSpacing(deep + 1, SPACING, statuses.unchanged)) : val);

  // const buildValue = (val) => (_.isPlainObject(val) ? `{${stylish(val, deep + 1)}}` : val);
  // if (_.isObject(val)) {
  //   return stylish();
  // }
  // return _.isArray(val) ? `{${stylish(val, deep + 1)}}` : val;

  //   if (node.status === statuses.nested) {
  //     const item = `${getSpacing(deep, SPACING, statuses.nested)}${node.key}: ${stylish(node.value, deep + 1)}\n`;
  //     return acc + item;
  //   }
  //   const item = `${getSpacing(deep, SPACING, node.status)}${node.key}: ${buildValue(node.value)}\n`;
  //   return acc + item;
  // }, '{\n');
  // return `${result}${getSpacing(deep - 1, 4, deep - 1 ? 'unchanged' : 'clear')}}`;
};
export default stylish;
