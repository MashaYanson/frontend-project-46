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
  const iter = (node, parent = '') => node.reduce((str, {
    key, status, value, children,
  }) => {
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
        return `${str}${iter(children, path)}`;

      case 'unchanged':
        return str;

      default:
        throw Error(`${status} is not found`);
    }
  }, '');
  return iter(tree).trimEnd();
};

export default plain;
