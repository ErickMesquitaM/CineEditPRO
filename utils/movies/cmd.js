const fs = require('fs');
const getExt = require("../getExt");

function commandMovie(path, video, cover, subs) {

  const addVideo = `-i "files/movies/${path}/${video}" `;
  const addCover = cover ? `-i "files/movies/${path}/${cover}"  ` : '';
  var optCover = cover ? `-attach "files/movies/${path}/${cover}" -metadata:s:t mimetype=image/${getTypeimage(cover)} -metadata:s:t filename=cover.${getExt(cover).toLowerCase()} ` : ''
  var addSubs = '';
  var options = `-c copy ${optCover} -map 0:v:0 -map 0:a `;
  var language = '';
  const output = `"files/output/${path}.mkv"`;


  subs.map( (sub, i) => {
    if(!sub) return;

    addSubs+= `-i "files/movies/${path}/${sub}" `;
    options+= `-map ${cover ? i + 2 : i + 1} -c:s:${cover ? i + 2 : i + 1} ${ getExt(sub).toLowerCase() } `;
    language+= `-metadata:s:s:${i} language=${sub.split(".")[0].split('_')[0]} `;
  });

  fs.appendFileSync('log.txt', `\n\n ffmpeg -y ${addVideo + addCover + addSubs + options + language + output}\n` );
  return 'ffmpeg -y ' + addVideo + addCover + addSubs + options + language + output;
};


function getTypeimage(img) {
  const ext = getExt(img);

  return ext === 'JPG' ? 'jpeg' : ext;
};


module.exports = commandMovie;