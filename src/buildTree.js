import _ from 'lodash';

export const status = {
  unchanged: 'unchanged',
  deleted: 'deleted',
  added: 'added',
  changed: 'changed',
  nested: 'nested',
};
const getValue = (item) => {
  if (!_.isPlainObject(item)) {
    return item;
  }
  const entries = Object.keys(item);
  return entries.reduce((acc, [key, newValue]) => {
    const value = _.isPlainObject(newValue) ? getValue(newValue) : newValue;
    return { ...acc, key, value };
  }, '');
};
function buildTree(obj1, obj2) {
  const keys = Array.from(new Set([...Object.keys(obj1), ...Object.keys(obj2)]));
  const sortedKeys = _.sortBy(keys);

  /* {  key: item,
    status: 'updated',
    prevValue: obj1[item],
    newValue: obj2[item],} */

  return sortedKeys.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (_.isObject(value1) && _.isObject(value2)) {
      return [...acc, {
        key,
        status: status.nested,
        value: buildTree(value1, value2),
      }];
    }
    if (!Object.hasOwn(obj2, key)) {
      acc.push({
        key,
        status: status.deleted,
        value: value1,
      });
    }
    if (!Object.hasOwn(obj1, key)) {
      acc.push({
        key,
        status: status.added,
        value: value2,
      });
    }
    if (value1 !== value2 && Object.hasOwn(obj2, key) && Object.hasOwn(obj1, key)) {
      acc.push({
        key,
        status: status.changed,
        value: {
          old: value1,
          new: value2,
        },
      });
    }
    if (value1 === value2) {
      acc.push({
        key,
        status: status.unchanged,
        value: value1,
      });
    }
    return acc;
  }, []);
}

export default buildTree;
