import _ from 'lodash';
import getMatch from './getStatus.js';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
};

function buildTree(obj1, obj2, path = '') {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const sortedKeys = _.sortBy(keys);
  const getValue = (item1, item2, lpath) => {
    if (_.isPlainObject(item1)) {
      return buildTree(item1, item2, lpath);
    }
    return item1;
  };
  return sortedKeys.reduce((acc, key) => {
    const newPath = path === '' ? `${key}` : `${path}.${key}`;
    // switch (key) {
    //   case (_.has(obj1, key) && _.has(obj2, key) && getMatch(obj1[key], obj2[key])):
    //     // eslint-disable-next-line no-case-declarations
    //     const node = {
    //       key,
    //       status: status.unchanged,
    //       hasChildren: _.isPlainObject(obj1[key]),
    //       path: newPath,
    //       value: getValue(obj1[key], obj2[key], newPath),
    //
    //     };
    //     return [...acc, node];
    //   default:
    //     console.log('default');
    // }
    if (_.has(obj1, key) && _.has(obj2, key) && getMatch(obj1[key], obj2[key])) {
      const node = {
        key,
        status: status.unchanged,
        hasChildren: _.isPlainObject(obj1[key]),
        path: newPath,
        value: getValue(obj1[key], obj2[key], newPath),

      };
      return [...acc, node];
    }
    if (_.has(obj1, key) && _.has(obj2, key) && !getMatch(obj1[key], obj2[key])) {
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
    if (_.has(obj1, key) && !_.has(obj2, key)) {
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
