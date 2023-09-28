import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const getFormatterByName = (format) => {
  switch (format) {
    case 'plain':
      return (tree) => plain(tree);
    case 'json':
      return (tree) => json(tree);
    case 'stylish':
      return (tree) => stylish(tree);
    default:
      throw new Error(`Unsupported format: ${format}`);
  }
};

export default getFormatterByName;
