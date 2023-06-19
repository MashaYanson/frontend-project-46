import fs from 'fs';
// Функция для загрузки JSON-файла
const loadJSONFile = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  return JSON.parse(data);
};

export default loadJSONFile;
