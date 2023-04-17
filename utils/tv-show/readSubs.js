const fs = require('fs');

function readSubs(path) {
  const pathSubs = fs.readdirSync(`./files/tv-show/${path}`, { withFileTypes: true }).filter( file => file.isDirectory() );

  var subs = [];
  pathSubs.map(pathSub => subs.push( {pathName: pathSub.name, subs: fs.readdirSync(`./files/tv-show/${path}/${pathSub.name}/`)} ));

  return subs;
}


module.exports = readSubs;