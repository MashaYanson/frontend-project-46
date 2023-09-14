import { describe, expect, test } from '@jest/globals';
import path from 'path';
import expectedDiff from '../__fixtures__/expectedDiff.js';
import expectedPlaneDiff from '../__fixtures__/expectedPlaneDiff.js';
import expectedJsonDiff from '../__fixtures__/expectedJsonDiff.js';
import genDiff from '../src/index.js';

const file1 = '__fixtures__/file1.json';
const file2 = '__fixtures__/file2.json';

describe('Сравнение плоских JSON-файлов', () => {
  const filePath1 = path.resolve(file1);
  const filePath2 = path.resolve(file2);

  test('Проверка работы с дефолтным значением форматтера', () => {
    const tree = genDiff(filePath1, filePath2);
    expect(tree).toBe(expectedDiff);
  });
  test('Проверка json вида', () => {
    const jsonTree = genDiff(filePath1, filePath2, 'json');
    expect(jsonTree).toMatch(expectedJsonDiff);
  });
  test('Проверка stylish вида', () => {
    const tree = genDiff(filePath1, filePath2, 'stylish');
    expect(tree).toBe(expectedDiff);
  });
  test('Проверка плоского вида', () => {
    const plain1 = genDiff(filePath1, filePath2, 'plain');
    expect(plain1).toMatch(expectedPlaneDiff);
  });
});
