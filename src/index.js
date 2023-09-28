import fs from 'fs';
import path from 'path';
import parse from './parsers/parse.js';
import buildTree from './buildTree.js';
import getFormatterByName from './formatters/formatersMap.js';

const genDiff = (file1, file2, format = 'stylish') => {
  const absolutePath1 = path.resolve(process.cwd(), file1);
  const absolutePath2 = path.resolve(process.cwd(), file2);

  const data1 = fs.readFileSync(absolutePath1, 'utf8');
  const data2 = fs.readFileSync(absolutePath2, 'utf8');
  const extFormat1 = path.extname(file1).slice(1);
  const extFormat2 = path.extname(file2).slice(1);
  const obj1 = parse(data1, extFormat1);
  const obj2 = parse(data2, extFormat2);
  const tree = buildTree(obj1, obj2);
  const formatter = getFormatterByName(format);
  return formatter(tree);
};
export default genDiff;
