const getValue = (value) => {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  if (typeof value === 'number' || typeof value === 'boolean' || value === null) {
    return value;
  }
  if (typeof value === 'undefined') {
    return value;
  }
  return '[complex value]';
};

// найти родителей каждого ключа
const plain = (tree) => {
  const iter = (node, parent = '') => {
    const result = node.reduce((str, { key, status, value }) => {
      const path = parent ? `${parent}.${key}` : key;
      switch (status) {
        case 'added':
          return `${str}Property '${path}' was added with value: ${getValue(value)}\n`;

        case 'deleted':
          return `${str}Property '${path}' was removed\n`;

        case 'changed':
          // eslint-disable-next-line max-len
          return `${str}Property '${path}' was updated. From ${getValue(value.old)} to ${getValue(value.new)}\n`;

        case 'nested':
          return `${str}${iter(value, path)}`;

        case 'unchanged':
          return str;

        default:
          throw Error(`${status} is not found`);
      }
    }, '');
    return result;
  };
  return iter(tree).trimEnd();
};
// const plain = (tree) => {
//   const iter = (node, parent = '') => {
//     tree.reduce((acc, { key, status, value }) => {
//       const path = parent ? `${parent}.${key}` : key;
//       switch (status) {
//         case 'added':
//           return `${acc}Property '${path}' was added with value: ${getValue(value)}\n`;
//         case 'deleted':
//           return `${acc}Property '${path}' was removed\n`;
//         case 'nested':
//           return `${acc}${iter(value, path)}\n`;
//         case 'changed':
//           return `Property '${path}' was updated. From ${getValue(value.oldValue)} to ${getValue(value.newValue)}\n`;
//         case 'unchanged':
//           return acc;
//
//         default:
//           throw Error(`${status} is not fount`);
//       }
//       // return acc;
//     }, '');
//   };
//   return iter(tree , '').trimEnd();
// };
export default plain;

// if (node.status === status.added || node.status === status.deleted) {
//   const item = `${descriptionMap[node.status](node)}\n`;
//   return acc + item;
// }
// if (node.status === status.changed) {
//   const newAcc = `${acc}${descriptionMap.changed(node)}\n`;
//   if (node.hasChildren) {
//     const item = `${plain(node.value)}`;
//     return newAcc + item;
//   }
//   return newAcc;
// }
// if (node.status === status.unchanged) {
//   if (node.hasChildren) {
//     const item = `${plain(node.value)}`;
//     return acc + item;
//   }
//   return acc;
// }
