import fs from 'fs';
import path from 'path';
import parse from './parsers/parse.js';
import buildTree from './buildTree.js';
import stylish from './formatters/stylish.js';

const formatersMap = {
  stylish,
};
const genDiff = (file1, file2, { format }) => {
  // парсим файлы
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extFormat1 = path.extname(file1);
  const extFormat2 = path.extname(file2);
  const obj1 = parse(data1, extFormat1);
  const obj2 = parse(data2, extFormat2);
  // строим дерево
  const tree = buildTree(obj1, obj2);
  // форматируем выводим
  console.log(formatersMap[format](tree));
};
export default genDiff;
