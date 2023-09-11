import fs from 'fs';
import path from 'path';
import parse from './parsers/parse.js';
import buildTree from './buildTree.js';
import stylish from './formatters/stylish.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const formatersMap = {
  stylish,
  plain: (tree) => plain(tree).trim(),
  json,
};
const genDiff = (file1, file2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), file1);
  const absolutePath2 = path.resolve(process.cwd(), file2);

  const data1 = fs.readFileSync(absolutePath1, 'utf8');
  const data2 = fs.readFileSync(absolutePath2, 'utf8');
  const extFormat1 = path.extname(file1);
  const extFormat2 = path.extname(file2);
  const obj1 = parse(data1, extFormat1);
  const obj2 = parse(data2, extFormat2);
  const tree = buildTree(obj1, obj2);
  return (formatersMap[format](tree));
};
export default genDiff;
