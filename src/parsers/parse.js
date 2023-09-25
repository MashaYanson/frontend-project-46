import YAML from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case '.json':
      return JSON.parse(data);
    case '.yaml':
    case '.yml':
      try {
        return YAML.parse(data);
      } catch (e) {
        console.error(`Error parsing YAML file: ${data}`);
        return {};
      }

    default:
      return {};
  }
};
export default parse;
