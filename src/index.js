import readFile from './parsers.js';
import getAstDifferent from './astTreeBuilder.js';
import formatter from '../formatters/index.js';

const compare = (file1, file2, formatName = 'stylish') => {
  const astTree = getAstDifferent(readFile(file1), readFile(file2));

  const result = formatter(astTree, formatName);
  console.log(formatter(astTree, formatName));
  return result;
};

export default compare;
