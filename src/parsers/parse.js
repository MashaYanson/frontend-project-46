// path.extname(path)
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const parseFile = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  const extFormat = path.extname(filename);
  if (extFormat === '.json') {
    return JSON.parse(data);
  }
  if (extFormat === '.yml' || extFormat === '.yaml') {
    try {
      return yaml.safeLoad(data);
    } catch (e) {
      console.error(`Error parsing YAML file: ${filename}`);
      return {};
    }
  }
  return null;
};
export default parseFile;
