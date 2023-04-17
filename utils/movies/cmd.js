
function commandMovie(path, video, cover, subs) {
  
  const addVideo = `-i "files/movies/${path}/${video}" `;
  const addCover = cover ? `-i "files/movies/${path}/${cover}" ` : '';
  var addSubs = '';
  var options = `-c copy -c:s mov_text ${cover ? '-map 1 ' : ''}-map 0:v -map 0:a `;
  var language = '';
  const output = `"files/output/${path}.mp4"`;

  subs.map( (sub, i) => {
    addSubs+= `-i "files/movies/${path}/${sub}" `;
    options+= `-map ${cover ? i + 2 : i + 1} `;
    language+= `-metadata:s:s:${i} language=${sub.split(".")[0]} `;
  });

  return 'ffmpeg -y ' + addVideo + addCover + addSubs + options + language + output;
};


module.exports = commandMovie;