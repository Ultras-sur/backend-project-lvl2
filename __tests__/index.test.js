import path from 'path';
import compare from '../src/index.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturesPath = (filename) =>
  path.join(__dirname, '..', '__fixtures__', filename);

const file1 = getFixturesPath('before.json');
const file2 = getFixturesPath('after.json');

/*
const file1 = path.resolve('./__fixtures__/before.json');
const file2 = path.resolve('./__fixtures__/after.json');
*/
console.log(file1);
test('test1', () => {
  const expect1 =
    `{\n` +
    `  - follow: false\n` +
    `    host: hexlet.io\n` +
    `  - proxy: 123.234.53.22\n` +
    `  - timeout: 50\n` +
    `  + timeout: 20\n` +
    `  + verbose: true\n` +
    `}`;

  expect(compare(file1, file2)).toEqual(expect1);
});

test('test2', () => {
  const expect2 =
    `{\n` +
    `  + follow: false\n` +
    `    host: hexlet.io\n` +
    `  + proxy: 123.234.53.22\n` +
    `  - timeout: 20\n` +
    `  + timeout: 50\n` +
    `  - verbose: true\n` +
    `}`;
  expect(compare(file2, file1)).toEqual(expect2);
});
