import _ from 'lodash';

function printer(item) {
  const result = _.keys(item).reduce((acc, elem) => {
    if (item[elem].type === 'value') {
      acc[elem] = item[elem].value;
    } else {
      acc[elem] = printer(item[elem].childrens);
    }
    return acc;
  }, {});
  return result;
}

function jsonFormater(astTree) {
  const allKeys = _.keys(astTree);

  const result = allKeys.reduce((acc, elem) => {
    if (astTree[elem].change === 'added') {
      if (astTree[elem].childrens) {
        acc[`+ ${elem}`] = printer(astTree[elem].childrens);
      } else {
        acc[`+ ${elem}`] = astTree[elem].value;
      }
    } else if (astTree[elem].change === 'deleted') {
      if (astTree[elem].childrens) {
        acc[`- ${elem}`] = printer(astTree[elem].childrens);
      } else {
        acc[`- ${elem}`] = astTree[elem].value;
      }
    } else if (astTree[elem].change === 'changed') {
      if (astTree[elem].childrens) {
        acc[elem] = jsonFormater(astTree[elem].childrens);
      } else if (astTree[elem].oldType === 'object') {
        acc[`- ${elem}`] = printer(astTree[elem].oldValue);
        acc[`+ ${elem}`] = astTree[elem].newValue;
      } else if (astTree[elem].newType === 'object') {
        acc[`- ${elem}`] = astTree[elem].oldValue;
        acc[`+ ${elem}`] = printer(astTree[elem].newValue);
      } else {
        acc[`- ${elem}`] = astTree[elem].oldValue;
        acc[`+ ${elem}`] = astTree[elem].newValue;
      }
    } else if (astTree[elem].change === 'unchanged') {
      if (astTree[elem].childrens) {
        acc[elem] = jsonFormater(astTree[elem].childrens);
      } else {
        acc[elem] = astTree[elem].value;
      }
    }

    return acc;
  }, {});
  return result;
}

export default (tree) => JSON.stringify(jsonFormater(tree));
