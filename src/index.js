import readFile from './parsers.js';
import getAstDifferent from './astTreeBuilder.js';
import formater from '../formaters/index.js';

const compare = (file1, file2, formatName = 'stylish') => {
  const astTree = getAstDifferent(readFile(file1), readFile(file2));

  const result = formater(astTree, formatName);
  console.log(result);
  return result;
};

export default compare;
