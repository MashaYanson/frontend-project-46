import _ from 'lodash';
import getMatch from './getStatus.js';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};

function buildTree(obj1, obj2, path = '') {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)])).sort();
  const getValue = (item1, item2, lpath) => {
    if (_.isPlainObject(item1)) {
      return buildTree(item1, item2, lpath);
    }
    return item1;
  };
  return keys.reduce((acc, key) => {
    const newPath = path === '' ? `${key}` : `${path}.${key}`;
    // eslint-disable-next-line no-prototype-builtins
    const hasKey1 = obj1.hasOwnProperty(key);
    // eslint-disable-next-line no-prototype-builtins
    const hasKey2 = obj2.hasOwnProperty(key);
    if (hasKey1 && hasKey2 && getMatch(obj1[key], obj2[key])) {
      const node = {
        key,
        status: status.unchanged,
        hasChildren: _.isPlainObject(obj1[key]),
        path: newPath,
        value: getValue(obj1[key], obj2[key], newPath),

      };
      return [...acc, node];
    }
    if (hasKey1 && hasKey2 && !getMatch(obj1[key], obj2[key])) {
      const node = {
        key,
        oldValue: getValue(obj1[key], obj1[key], newPath),
        status: status.changed,
        hasChildren: _.isPlainObject(obj2[key]),
        hasOldChildren: _.isPlainObject(obj1[key]),
        path: newPath,
        value: getValue(obj2[key], obj2[key], newPath),

      };
      return [...acc, node];
    }
    if (hasKey1 && !hasKey2) {
      const node = {
        key,
        status: status.deleted,
        hasChildren: _.isPlainObject(obj1[key]),
        path: newPath,
        value: getValue(obj1[key], obj1[key], newPath),

      };
      return [...acc, node];
    }

    const node = {
      key,
      status: status.added,
      hasChildren: _.isPlainObject(obj2[key]),
      path: newPath,
      value: getValue(obj2[key], obj2[key], newPath),

    };
    return [...acc, node];
  }, []);
}

export default buildTree;
