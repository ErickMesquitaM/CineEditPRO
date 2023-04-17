

function getExt(str){
  const arr = str.split(".");
  return arr[arr.length - 1].toUpperCase();
}

module.exports = getExt;