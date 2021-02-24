import fs from 'fs';

// Чтение файла json
const readFile = (file) => {
  const read = fs.readFileSync(file);
  return JSON.parse(read);
};

const compare = (file1, file2) => {
  const toReadFile1 = readFile(file1);
  const toReadFile2 = readFile(file2);
  const keysFile1 = Object.keys(toReadFile1);
  const keysFile2 = Object.keys(toReadFile2);
  const sortedCommonKeys = [...keysFile1, ...keysFile2]
    .reduce((result, item) => (result.includes(item) ? result : [...result, item]), [])
    .sort();

  let result = '{\n';
  for (const key of sortedCommonKeys) {
    if (!keysFile1.includes(key)) {
      result += `  + ${key}: ${toReadFile2[key]}\n`;
    } else if (!keysFile2.includes(key)) {
      result += `  - ${key}: ${toReadFile1[key]}\n`;
    } else if (toReadFile1[key] !== toReadFile2[key]) {
      result += `  - ${key}: ${toReadFile1[key]}\n`;
      result += `  + ${key}: ${toReadFile2[key]}\n`;
    } else {
      result += `    ${key}: ${toReadFile1[key]}\n`;
    }
  }
  console.log(result += '}');
};

export default compare;
