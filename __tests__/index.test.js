import path from 'path';
import compare from '../src/index.js';

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

  expect(
    compare(
      path.resolve('./__fixtures__/before.json'),
      path.resolve('./__fixtures__/after.json')
    )
  ).toEqual(expect1);
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
  expect(
    compare(
      path.resolve('./__fixtures__/after.json'),
      path.resolve('./__fixtures__/before.json')
    )
  ).toEqual(expect2);
});
