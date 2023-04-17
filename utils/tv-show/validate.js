

function validate(names, videos, subs){
  const manyItems = [names.length, videos.length];

  subs.map( sub => manyItems.push(sub.subs.length) );

  return areAllEqual(manyItems) ? true : manyItems;
};

function areAllEqual(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[0]) {
      return false;
    }
  }
  return true;
};

module.exports = validate;