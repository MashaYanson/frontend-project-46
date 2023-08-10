import { describe, expect, test } from '@jest/globals';
import fs from 'fs';
import path from 'path';
import compareFiles from './compareFiles.js';
import parse from '../parsers/parse.js';
import buildTree from '../buildTree.js';
import expectedDiff from '../__fixtures__/expectedDiff.js';
import expectedPlaneDiff from '../__fixtures__/expectedPlaneDiff.js';
import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';

const file1 = 'src/__fixtures__/file1.json';
const file2 = 'src/__fixtures__/file2.json';

// написать тест для парсеров
describe('Сравнение плоских JSON-файлов', () => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extFormat1 = path.extname(file1);
  const extFormat2 = path.extname(file2);
  const json1 = parse(data1, extFormat1);
  const json2 = parse(data2, extFormat2);
  test('Проверка на равенство', () => {
    expect(compareFiles(json1, json1)).toBe(true);
  });

  test('Проверка на неравенство', () => {
    expect(compareFiles(json1, json2)).toBe(false);
  });

  test('Проверка на пустые объекты', () => {
    const emptyFile1 = {};
    const emptyFile2 = {};
    expect(compareFiles(emptyFile1, emptyFile2)).toBe(true);
  });

  test('Проверка на отсутствие ключа во втором объекте', () => {
    const missingKeyFile1 = { key1: 'value1', key2: 'value2' };
    const json3 = { key1: 'value1' };
    expect(compareFiles(missingKeyFile1, json3)).toBe(false);
  });

  test('Проверка на разные значения ключа', () => {
    const differentValueJson1 = { key1: 'value1' };
    expect(compareFiles(differentValueJson1, json1)).toBe(false);
  });

//   test('Проверка на порядок ключей', () => {
//     const json1 = { key1: 'value1', key2: 'value2' };
//     const json6 = { key2: 'value2', key1: 'value1' };
//     expect(compareFiles(json5, json6)).toBe(true);
//   });
});

// describe('Сравнение файлов с вложенными структурами', () => {
//   const json1 = parse(file1);
//   const json2 = parse(file2);
//   test('Проверка вывода результата', () => {
//     const result = buildTree(json1, json2);
//     expect(result).toBe(expectedDiff);
//   });
// });

describe('Построение дерева', () => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extFormat1 = path.extname(file1);
  const extFormat2 = path.extname(file2);
  const json1 = parse(data1, extFormat1);
  const json2 = parse(data2, extFormat2);
  test('Проверка', () => {
    const tree = stylish(buildTree(json1, json2));
    expect(tree).toBe(expectedDiff);
  });
});

describe('Построение плоского вида', () => {
  const data1 = fs.readFileSync(file1, 'utf8');
  const data2 = fs.readFileSync(file2, 'utf8');
  const extFormat1 = path.extname(file1);
  const extFormat2 = path.extname(file2);
  const json1 = parse(data1, extFormat1);
  const json2 = parse(data2, extFormat2);
  test('Проверка плоского вида', () => {
    const plain1 = plain(buildTree(json1, json2));
    console.log(expectedPlaneDiff);
    console.log('****');
    console.log(plain1);
    expect(plain1).toMatch(expectedPlaneDiff);
  });
});
