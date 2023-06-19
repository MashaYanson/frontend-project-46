import loadJSONFile from './__fixtures__/loadJSON.js';
import compareJSON from './__fixtures__/compareJSON.js';

describe('Сравнение плоских JSON-файлов', () => {
  const file1 = 'file1.json';
  const file2 = 'file2.json';

  const json1 = loadJSONFile(file1);
  const json2 = loadJSONFile(file2);

  test('Проверка на равенство', () => {
    expect(compareJSON(json1, json1)).toBe(true);
  });

  test('Проверка на неравенство', () => {
    expect(compareJSON(json1, json2)).toBe(false);
  });

  test('Проверка на пустые объекты', () => {
    const emptyJson1 = {};
    const emptyJson2 = {};
    expect(compareJSON(emptyJson1, emptyJson2)).toBe(true);
  });

  test('Проверка на отсутствие ключа во втором объекте', () => {
    const missingKeyJson1 = { key1: 'value1', key2: 'value2' };
    const json3 = { key1: 'value1' };
    expect(compareJSON(missingKeyJson1, json3)).toBe(false);
  });

  test('Проверка на разные значения ключа', () => {
    const differentValueJson1 = { key1: 'value1' };
    const json4 = { key1: 'value2' };
    expect(compareJSON(differentValueJson1, json4)).toBe(false);
  });

  test('Проверка на порядок ключей', () => {
    const json5 = { key1: 'value1', key2: 'value2' };
    const json6 = { key2: 'value2', key1: 'value1' };
    expect(compareJSON(json5, json6)).toBe(true);
  });
});
