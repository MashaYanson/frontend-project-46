// Функция для сравнения двух плоских JSON-объектов
const compareFiles = (json1, json2) => {
  const keys1 = Object.keys(json1);
  const keys2 = Object.keys(json2);

  // Проверка на равное количество ключей
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Проверка наличия одинаковых ключей и значений
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys1) {
    if (!keys2.includes(key) || json1[key] !== json2[key]) {
      return false;
    }
  }

  return true;
};
export default compareFiles;
