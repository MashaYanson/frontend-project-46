import YAML from 'yaml';

const parseFile = (data, extFormat) => {
  if (extFormat === '.json') {
    return JSON.parse(data);
  }
  if (extFormat === '.yml' || extFormat === '.yaml') {
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
