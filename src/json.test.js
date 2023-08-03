import compareFiles from './compareFiles.js';
import parse from './parsers/parse.js';

describe('Сравнение плоских JSON-файлов', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';

  const json1 = parse(file1);
  const json2 = parse(file2);

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
    const json4 = { key1: 'value2' };
    expect(compareFiles(differentValueJson1, json4)).toBe(false);
  });

  test('Проверка на порядок ключей', () => {
    const json5 = { key1: 'value1', key2: 'value2' };
    const json6 = { key2: 'value2', key1: 'value1' };
    expect(compareFiles(json5, json6)).toBe(true);
  });
});
