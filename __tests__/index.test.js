import { describe, expect, test } from '@jest/globals';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const file1 = '/file1.json';
const file2 = '/file2.json';
const file3 = '/file1.yaml';
const file4 = '/file2.yml';

describe('Сравнение плоских JSON-файлов', () => {
  const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);
  const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

  const fileJson1 = getFixturePath(file1);
  const fileJson2 = getFixturePath(file2);
  const fileYml1 = getFixturePath(file3);
  const fileYml2 = getFixturePath(file4);

  test('Проверка работы с дефолтным значением форматтера', () => {
    const diff = genDiff(fileJson1, fileJson2);
    expect(diff).toEqual(readFile('expectedDiff.txt'));
  });
  test('Проверка работы YML с дефолтным значением форматтера', () => {
    const diff = genDiff(fileYml1, fileYml2);
    expect(diff).toEqual(readFile('expectedYmlDiff.txt'));
  });
  test('Проверка json вида', () => {
    const diff = genDiff(fileJson1, fileJson2, 'json');
    expect(diff).toEqual(readFile('expectedJsonDiff.txt'));
  });
  test('Проверка stylish вида', () => {
    const diff = genDiff(fileJson1, fileJson2, 'stylish');
    expect(diff).toEqual(readFile('expectedDiff.txt'));
  });
  test('Проверка плоского вида', () => {
    const diff = genDiff(fileJson1, fileJson2, 'plain');
    expect(diff).toEqual(readFile('expectedPlaneDiff.txt'));
  });
});
