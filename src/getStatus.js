import _ from 'lodash';

const getMatch = (old, next) => {
  if (_.isPlainObject(old) && _.isPlainObject(next)) {
    return true;
  }
  return old === next;
};
export default getMatch;
