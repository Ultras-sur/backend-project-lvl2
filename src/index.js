import fs from 'fs';

// Чтение файла json
const readFile = (file) => {
  const read = fs.readFileSync(file);
  return JSON.parse(read);
};
// Сравнение файлов
const compare = (file1, file2) => {
  const toReadFile1 = readFile(file1);
  const toReadFile2 = readFile(file2);
  const keysFile1 = Object.keys(toReadFile1);
  const keysFile2 = Object.keys(toReadFile2);
  const sortedCommonKeys = [...keysFile1, ...keysFile2]
    .reduce(
      (result, item) => (result.includes(item) ? result : [...result, item]),
      []
    )
    .sort();

  let result = sortedCommonKeys.reduce((acc, key) => {
    if (!keysFile1.includes(key)) {
      return `${acc}  + ${key}: ${toReadFile2[key]}\n`;
    }
    if (!keysFile2.includes(key)) {
      return `${acc}  - ${key}: ${toReadFile1[key]}\n`;
    }
    if (toReadFile1[key] !== toReadFile2[key]) {
      return (
        `${acc}  - ${key}: ${toReadFile1[key]}\n` +
        `  + ${key}: ${toReadFile2[key]}\n`
      );
    }
    return `${acc}    ${key}: ${toReadFile1[key]}\n`;
  }, '{\n');

  result += '}';
  console.log(result);
  return result;
};

export default compare;
