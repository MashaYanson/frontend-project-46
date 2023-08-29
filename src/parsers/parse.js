import YAML from 'yaml';

const parseFile = (data, format) => {
  if (format === '.json') {
    return JSON.parse(data);
  }
  if (format === '.yml' || format === '.yaml') {
    try {
      return YAML.parse(data);
    } catch (e) {
      console.error(`Error parsing YAML file: ${data}`);
      return {};
    }
  }
  return null;
};
export default parseFile;
