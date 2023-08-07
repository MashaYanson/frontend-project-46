import isObject from './isObject.js';

const getMatch = (old, next) => {
  if (isObject(old) && isObject(next)) {
    return true;
  }
  return old === next;
};
export default getMatch;
