import _ from 'lodash';
import getMatch from './getStatus.js';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};
const buildTree = (obj1, obj2, path = '') => {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const getValue = (item1, item2, lpath) => {
    if (_.isPlainObject(item1)) {
      return buildTree(item1, item2, lpath);
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
        key,
        value: getValue(obj1[key], obj2[key],path),
        status: status.unchanged,
        hasChildren: _.isPlainObject(obj1[key]),
        path: `${path}.${key}`,
      };
      result.push(node);
    }
    if (hasKey1 && hasKey2 && !getMatch(obj1[key], obj2[key], path)) {
      const node1 = {
        key,
        value: getValue(obj1[key], obj1[key]),
        status: status.deleted,
        hasChildren: _.isPlainObject(obj1[key]),
        path: `${path}.${key}`,
      };
      const node2 = {
        key,
        value: getValue(obj2[key], obj2[key]),
        status: status.added,
        hasChildren: _.isPlainObject(obj2[key]),
        path: `${path}.${key}`,
      };
      result.push(node1, node2);
    }
    if (hasKey1 && !hasKey2) {
      const node = {
        key,
        value: getValue(obj1[key], obj1[key], path),
        status: status.deleted,
        hasChildren: _.isPlainObject(obj1[key]),
        path: `${path}.${key}`,
      };
      result.push(node);
    }
    if (!hasKey1 && hasKey2) {
      const node = {
        key,
        value: getValue(obj2[key], obj2[key], path),
        status: status.added,
        hasChildren: _.isPlainObject(obj2[key]),
        path: `${path}.${key}`,
      };
      result.push(node);
    }
  });
  return result;
};

export default buildTree;
