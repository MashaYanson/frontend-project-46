import plain from './plain.js';
import json from './json.js';
import stylish from './stylish.js';

const getFormatterByName = (tree, formatName) => {
  switch (formatName) {
    case 'plain':
      return plain(tree);
    case 'json':
      return json(tree);
    case 'stylish':
      return stylish(tree);
    default:
      throw new Error(`Unsupported format: ${formatName}`);
  }
};

export default getFormatterByName;
