import fs from 'fs';
import path from 'path';
import parse from './parsers/parse.js';
import buildTree from './buildTree.js';
import getFormatterByName from './formatters/formatersMap.js';

const getDataAndFormat = (file) => {
  const data = fs.readFileSync(path.resolve(process.cwd(), file), 'utf8');
  const format = path.extname(file).slice(1);
  return [data, format];
};
const genDiff = (file1, file2, format = 'stylish') => {
  // {data:data, format:'.json'}
  const obj1 = parse(...getDataAndFormat(file1));
  const obj2 = parse(...getDataAndFormat(file2));
  const tree = buildTree(obj1, obj2);
  return getFormatterByName(tree, format);
};
export default genDiff;
