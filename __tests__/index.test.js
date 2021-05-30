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
const fileTreeYml1 = getFixturesPath('fileTreeYml1.yml');
const fileTreeyml2 = getFixturesPath('fileTreeYml2.yml');

const expect1 =
  `{\n` +
  `  - follow: false\n` +
  `    host: hexlet.io\n` +
  `  - proxy: 123.234.53.22\n` +
  `  - timeout: 50\n` +
  `  + timeout: 20\n` +
  `  + verbose: true\n` +
  `}`;
const expect2 =
  `{\n` +
  `  + follow: false\n` +
  `    host: hexlet.io\n` +
  `  + proxy: 123.234.53.22\n` +
  `  - timeout: 20\n` +
  `  + timeout: 50\n` +
  `  - verbose: true\n` +
  `}`;

const expect3 = `{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow: 
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}`;

const expect4 =
  "Property 'common.follow' was added with value: false\n" +
  "Property 'common.setting2' was removed\n" +
  "Property 'common.setting3' was updated. From true to null\n" +
  "Property 'common.setting4' was added with value: 'blah blah'\n" +
  "Property 'common.setting5' was added with value: [complex value]\n" +
  "Property 'common.setting6.doge.wow' was updated. From '' to 'so much'\n" +
  "Property 'common.setting6.ops' was added with value: 'vops'\n" +
  "Property 'group1.baz' was updated. From 'bas' to 'bars'\n" +
  "Property 'group1.nest' was updated. From [complex value] to 'str'\n" +
  "Property 'group2' was removed\n" +
  "Property 'group3' was added with value: [complex value]";

const expect5 =
  '{"common":{"+ follow":false,"setting1":"Value 1","- setting2":200,"- setting3":true,"+ setting3":null,"+ setting4":"blah blah","+ setting5":{"key5":"value5"},"setting6":{"doge":{"- wow":"","+ wow":"so much"},"key":"value","+ ops":"vops"}},"group1":{"- baz":"bas","+ baz":"bars","foo":"bar","- nest":{"key":"value"},"+ nest":"str"},"- group2":{"abc":12345,"deep":{"id":45}},"+ group3":{"deep":{"id":{"number":45}},"fee":100500}}';

test('Test not tree 1', () => {
  expect(compare(file1, file2)).toEqual(expect1);
});

test('Test not tree 2', () => {
  expect(compare(file2, file1)).toEqual(expect2);
});
test('Test compare formater stylish', () => {
  expect(compare(fileTreeYml1, fileTreeyml2, 'stylish')).toEqual(expect3);
});

test('Test compare formater plain', () => {
  expect(compare(fileTreeYml1, fileTreeyml2, 'plain')).toEqual(expect4);
});
test('Test compare formater json', () => {
  expect(compare(fileTreeYml1, fileTreeyml2, 'json')).toEqual(expect5);
});
