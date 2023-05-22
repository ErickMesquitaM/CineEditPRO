const fs = require('fs');
const getExt = require("../getExt");

function commandTvShow(path, names, videos, subs, i, numEp) {

  const addVideo = `-i "files/tv-show/${path}/${videos[i]}" `;
  var addSubs = '';
  var options = `-c copy -map 0:v:0 -map 0:a `;
  var language = '';
  const output = `"files/output/${path}/${numberEp(numEp)} - ${names[i]}.mkv"`;

  subs.map( (sub, indexSub) => {
    if(!sub) return;

    addSubs+= `-i "files/tv-show/${path}/${sub.pathName}/${sub.subs[i]}" `;
    options+= `-map ${indexSub + 1} -c:s:${i + 1} ${ getExt(sub.subs[0]).toLowerCase() } `;
    language+= `-metadata:s:s:${indexSub} language=${sub.pathName} `;
  });

  fs.appendFileSync('log.txt', `\n -ffmpeg -y ${addVideo + addSubs + options + language + output} \n` );


  return 'ffmpeg -y ' + addVideo + addSubs + options + language + output;
};

function numberEp(i){
  if(i < 9) return '0'+ (i + 1);
  else return String(i + 1);
};


module.exports = commandTvShow;