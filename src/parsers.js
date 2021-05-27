import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

const readFile = (file) => {
  const data = fs.readFileSync(file);
  const format = path.extname(file);
  let parse;
  if (format === '.json') {
    parse = JSON.parse;
  } else if (format === '.yml') {
    parse = yaml.load;
  }
  return parse(data);
};

export default readFile;
