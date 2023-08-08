import yaml from 'js-yaml';

const parseFile = (data, extFormat) => {
  if (extFormat === '.json') {
    return JSON.parse(data);
  }
  if (extFormat === '.yml' || extFormat === '.yaml') {
    try {
      return yaml.safeLoad(data);
    } catch (e) {
      console.error(`Error parsing YAML file: ${data}`);
      return {};
    }
  }
  return null;
};
export default parseFile;
