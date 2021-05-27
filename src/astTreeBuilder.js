import _ from 'lodash';

const astTree = (obj) => {
  const keys = _.keys(obj).sort();
  return keys.reduce((acc, key) => {
    if (_.isPlainObject(obj[key])) {
      acc[key] = { type: 'object', childrens: astTree(obj[key]) };
    } else {
      acc[key] = { type: 'value', value: obj[key] };
    }
    return acc;
  }, {});
};

const astDifferent = (oldObj, newObj) => {
  const allKeys = _.uniq([_.keys(oldObj), _.keys(newObj)].flat().sort());

  return allKeys.reduce((acc, key) => {
    if (!(key in newObj)) {
      acc[key] = { ...oldObj[key], change: 'deleted' };
    } else if (!(key in oldObj)) {
      acc[key] = { ...newObj[key], change: 'added' };
    } else if (
      oldObj[key].childrens &&
      newObj[key].childrens &&
      _.isEqual(oldObj[key].childrens, newObj[key].childrens)
    ) {
      acc[key] = {
        type: 'object',
        childrens: astDifferent(oldObj[key].childrens, newObj[key].childrens),
        change: 'unchanged',
      };
    } else if (
      oldObj[key].childrens &&
      newObj[key].childrens &&
      !_.isEqual(oldObj[key].childrens, newObj[key].childrens)
    ) {
      acc[key] = {
        type: 'object',
        childrens: astDifferent(oldObj[key].childrens, newObj[key].childrens),
        change: 'changed',
      };
    } else if (oldObj[key].type === 'value' && newObj[key].type === 'object') {
      acc[key] = {
        oldType: oldObj[key].type,
        newType: newObj[key].type,
        oldValue: oldObj[key].value,
        newValue: newObj[key].childrens,
      };
    } else if (oldObj[key].type === 'object' && newObj[key].type === 'value') {
      acc[key] = {
        oldType: oldObj[key].type,
        newType: newObj[key].type,
        oldValue: oldObj[key].childrens,
        newValue: newObj[key].value,
        change: 'changed',
      };
    } else if (oldObj[key].value !== newObj[key].value) {
      acc[key] = {
        type: oldObj[key].type,
        oldValue: oldObj[key].value,
        newValue: newObj[key].value,
        change: 'changed',
      };
    } else if (oldObj[key].value === newObj[key].value) {
      acc[key] = {
        type: oldObj[key].type,
        value: oldObj[key].value,
        change: 'unchanged',
      };
    }
    return acc;
  }, {});
};

export default (oldObj, newObj) => {
  const getAstTree1 = astTree(oldObj);
  const getAstTree2 = astTree(newObj);
  return astDifferent(getAstTree1, getAstTree2);
};
