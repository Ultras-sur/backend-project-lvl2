import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (astTree, formatName) => {
  let formater;

  if (formatName === 'stylish') {
    formater = stylish;
  } else if (formatName === 'plain') {
    formater = plain;
  } else if (formatName === 'json') {
    formater = json;
  }
  return formater(astTree);
};
