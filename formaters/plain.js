import _ from 'lodash';

function valueFormat(value) {
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
}

function plain(tree) {
  function format(astTree, way = '') {
    return _.keys(astTree).reduce((acc, elem) => {
      if (astTree[elem].change === 'added') {
        acc += `Property '${way + elem}' was added with value: ${
          astTree[elem].type === 'value'
            ? valueFormat(astTree[elem].value)
            : `[complex value]`
        }\n`;
      } else if (astTree[elem].change === 'deleted') {
        acc += `Property '${way + elem}' was removed\n`;
      } else if (astTree[elem].change === 'changed') {
        if (astTree[elem].childrens) {
          acc += format(astTree[elem].childrens, `${way + elem}.`);
        } else {
          acc += `Property '${way + elem}' was updated. From ${
            !_.isPlainObject(astTree[elem].oldValue)
              ? valueFormat(astTree[elem].oldValue)
              : `[complex value]`
          } to ${
            !_.isPlainObject(astTree[elem].newValue)
              ? valueFormat(astTree[elem].newValue)
              : `[complex value]`
          }\n`;
        }
      }
      return acc;
    }, '');
  }
  const result = format(tree).slice(0, -1);
  return result;
}

export default plain;
