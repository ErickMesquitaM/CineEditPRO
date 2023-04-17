
function commandTvShow(path, names, videos, subs, i, numEp) {

  const addVideo = `-i "files/tv-show/${path}/${videos[i]}" `;
  var addSubs = '';
  var options = `-c:v copy -c:a copy -c:s mov_text -map 0:v -map 0:a `;
  var language = '';
  const output = `"files/output/${path}/${numberEp(numEp)} - ${names[i]}.mp4"`;

  subs.map( (sub, indexSub) => {
    addSubs+= `-i "files/tv-show/${path}/${sub.pathName}/${sub.subs[i]}" `;
    options+= `-map ${indexSub + 1} `;
    language+= `-metadata:s:s:${i} language=${sub.pathName} `;
  });

  return 'ffmpeg -y ' + addVideo + addSubs + options + language + output;
};

function numberEp(i){
  if(i < 9) return '0'+ (i + 1);
  else return String(i + i);
};



module.exports = commandTvShow;