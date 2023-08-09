// Функция для сравнения двух плоских JSON-объектов
import _ from 'lodash';

const compareFiles = (json1, json2) => {
  const isPlain1 = _.isPlainObject(json1);
  const isPlain2 = _.isPlainObject(json2);
  if (!isPlain1 && !isPlain2) {
    return json1 === json2;
  }
  console.log('2', json1, json2);

  if (isPlain1 && isPlain2) {
    if (json1 === null && json2 === null) {
      return true;
    }
    if (json1 === null || json2 === null) {
      return false;
    }
    const keys1 = Object.keys(json1);
    const keys2 = Object.keys(json2);
    console.log('5', keys1, keys2);
    // Проверка на равное количество ключей
    if (keys1.length !== keys2.length) {
      return false;
    }
    console.log('3', json1, json2);

    // Проверка наличия одинаковых ключей и значений
    // eslint-disable-next-line no-restricted-syntax
    for (const key of keys1) {
      if (!compareFiles(json1[key], json2[key])) {
        return false;
      }
    }
    console.log('4', json1, json2);

    return true;
  }
  return false;
};
export default compareFiles;
