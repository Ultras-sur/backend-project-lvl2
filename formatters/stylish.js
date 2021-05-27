import _ from 'lodash';

function printer(item, space = 0) {
  space += 1;

  const result = _.keys(item).reduce((acc, elem) => {
    if (item[elem].type === 'value') {
      acc += `${'  '.repeat(space)}  ${elem}: ${item[elem].value}\n`;
    } else {
      acc += `${'  '.repeat(space)}  ${elem}: ${printer(
        item[elem].childrens,
        space + 1
      )}\n`;
    }
    return acc;
  }, `{\n`);
  return `${result}${'  '.repeat(space - 1)}}`;
}

const stylish = (astTree, space = 0) => {
  const allKeys = _.keys(astTree);
  space += 1;
  const result = allKeys.reduce((acc, elem) => {
    if (astTree[elem].change === 'added') {
      if (astTree[elem].childrens) {
        acc += `${'  '.repeat(space)}+ ${elem}: ${printer(
          astTree[elem].childrens,
          space + 1
        )}\n`;
      } else {
        acc += `${'  '.repeat(space)}+ ${elem}: ${astTree[elem].value}\n`;
      }
    } else if (astTree[elem].change === 'deleted') {
      if (astTree[elem].childrens) {
        acc += `${'  '.repeat(space)}- ${elem}: ${printer(
          astTree[elem].childrens,
          space + 1
        )}\n`;
      } else {
        acc += `${'  '.repeat(space)}- ${elem}: ${astTree[elem].value}\n`;
      }
    } else if (astTree[elem].change === 'changed') {
      if (astTree[elem].childrens) {
        acc += `${'  '.repeat(space)}  ${elem}: ${stylish(
          astTree[elem].childrens,
          space + 1
        )}\n`;
      } else if (astTree[elem].oldType === 'object') {
        acc += `${'  '.repeat(space)}- ${elem}: ${printer(
          astTree[elem].oldValue,
          space + 1
        )}\n`;
        acc += `${'  '.repeat(space)}+ ${elem}: ${astTree[elem].newValue}\n`;
      } else if (astTree[elem].newType === 'object') {
        acc += `${'  '.repeat(space)}- ${elem}: ${astTree[elem].oldValue}\n`;
        acc += `${'  '.repeat(space)}+ ${elem}: ${printer(
          astTree[elem].newValue,
          space + 1
        )}\n`;
      } else {
        acc += `${'  '.repeat(space)}- ${elem}: ${astTree[elem].oldValue}\n`;
        acc += `${'  '.repeat(space)}+ ${elem}: ${astTree[elem].newValue}\n`;
      }
    } else if (astTree[elem].change === 'unchanged') {
      if (astTree[elem].childrens) {
        acc += `${'  '.repeat(space)}  ${elem}: ${stylish(
          astTree[elem].childrens,
          space + 1
        )}\n`;
      } else {
        acc += `${'  '.repeat(space)}  ${elem}: ${astTree[elem].value}\n`;
      }
    }

    return acc;
  }, `{\n`);
  return `${result}${'  '.repeat(space - 1)}}`;
};

export default stylish;
