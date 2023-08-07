import isObject from './isObject.js';

import getMatch from './getStatus.js';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
};

const diff = (obj1, obj2) => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const getValue = (item1, item2) => {
    if (isObject(item1)) {
      return diff(item1, item2);
    }
    return item1;
  };

  const result = [];

  keys.forEach((key) => {
    // eslint-disable-next-line no-prototype-builtins
    const hasKey1 = obj1.hasOwnProperty(key);
    // eslint-disable-next-line no-prototype-builtins
    const hasKey2 = obj2.hasOwnProperty(key);

    if (hasKey1 && hasKey2 && getMatch(obj1[key], obj2[key])) {
      const node = {
        // eslint-disable-next-line max-len
        key, value: getValue(obj1[key], obj2[key]), status: status.unchanged, hasChildren: isObject(obj1[key]),
      };
      result.push(node);
    }
    if (hasKey1 && hasKey2 && !getMatch(obj1[key], obj2[key])) {
      const node1 = {
        // eslint-disable-next-line max-len
        key, value: getValue(obj1[key], obj1[key]), status: status.deleted, hasChildren: isObject(obj1[key]),
      };
      const node2 = {
        // eslint-disable-next-line max-len
        key, value: getValue(obj2[key], obj2[key]), status: status.added, hasChildren: isObject(obj2[key]),
      };
      result.push(node1, node2);
    }
    if (hasKey1 && !hasKey2) {
      const node = {
        // eslint-disable-next-line max-len
        key, value: getValue(obj1[key], obj1[key]), status: status.deleted, hasChildren: isObject(obj1[key]),
      };
      result.push(node);
    }
    if (!hasKey1 && hasKey2) {
      const node = {
        // eslint-disable-next-line max-len
        key, value: getValue(obj2[key], obj2[key]), status: status.added, hasChildren: isObject(obj2[key]),
      };
      result.push(node);
    }
  });
  return result;
};

export default diff;
