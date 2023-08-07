import parse from './parsers/parse.js';
import buildTree from './buildTree.js';
import stylish from './stylish.js';

const formatersMap = {
  stylish,
};
const getFormat = (file1, file2, { format }) => {
  const obj1 = parse(file1);
  const obj2 = parse(file2);
  const tree = buildTree(obj1, obj2);
  console.log( formatersMap[format](tree));
};
export default getFormat;
