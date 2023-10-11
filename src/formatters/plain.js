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

const plain = (tree) => {
  const iter = (node, parent = '') => node.flatMap(({
    key, status, value, children, value1, value2,
  }) => {
    const path = parent ? `${parent}.${key}` : key;
    switch (status) {
      case 'added':
        return `Property '${path}' was added with value: ${getValue(value)}`;

      case 'deleted':
        return `Property '${path}' was removed`;

      case 'changed':
        // eslint-disable-next-line max-len
        return `Property '${path}' was updated. From ${getValue(value1)} to ${getValue(value2)}`;

      case 'nested':
        return iter(children, path);

      case 'unchanged':
        return [];

      default:
        throw Error(`${status} is not found`);
    }
  }).join('\n');
  return iter(tree);
};

export default plain;
