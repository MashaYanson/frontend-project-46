import { describe, expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file1 = '/file1.json';
const file2 = '/file2.json';

describe('Сравнение плоских JSON-файлов', () => {
  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const fileJson1 = getFixturePath(file1);
  const fileJson2 = getFixturePath(file2);

  test('Проверка работы с дефолтным значением форматтера', () => {
    const tree = genDiff(fileJson1, fileJson2);
    expect(tree).toEqual(readFile('expectedDiff.txt'));
  });
  test('Проверка json вида', () => {
    const jsonTree = genDiff(fileJson1, fileJson2, 'json');
    expect(jsonTree).toEqual(readFile('expectedJsonDiff.txt'));
  });
  test('Проверка stylish вида', () => {
    const tree = genDiff(fileJson1, fileJson2, 'stylish');
    expect(tree).toEqual(readFile('expectedDiff.txt'));
  });
  test('Проверка плоского вида', () => {
    const plain1 = genDiff(fileJson1, fileJson2, 'plain');
    expect(plain1).toEqual(readFile('expectedPlaneDiff.txt'));
  });
});