import _ from 'lodash';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
  nested: 'nested',
};

function buildTree(obj1, obj2) {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const sortedKeys = _.sortBy(keys);

  return sortedKeys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return {
        key,
        status: status.nested,
        children: buildTree(value1, value2),
      };
    }
    if (!Object.hasOwn(obj2, key)) {
      return {
        key,
        status: status.deleted,
        value: value1,
      };
    }
    if (!Object.hasOwn(obj1, key)) {
      return {
        key,
        status: status.added,
        value: value2,
      };
    }
    if (value1 !== value2) {
      return {
        key,
        status: status.changed,
        value1,
        value2,
      };
    }
    return {
      key,
      status: status.unchanged,
      value: value1,
    };
  });
}

export default buildTree;
