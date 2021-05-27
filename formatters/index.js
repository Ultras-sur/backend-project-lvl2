import stylish from './stylish.js';
import plain from './plain.js';

export default (astTree, formatName) => {
  let formatter;

  if (formatName === 'stylish') {
    formatter = stylish;
  } else if (formatName === 'plain') {
    formatter = plain;
  }
  return formatter(astTree);
};
