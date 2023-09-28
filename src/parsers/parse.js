import YAML from 'yaml';

const parse = (data, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(data);
    case 'yaml':
    case 'yml':
      return YAML.parse(data);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};
export default parse;
