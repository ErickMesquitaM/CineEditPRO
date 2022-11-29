const { exec } = require("child_process");
const fs = require('fs')


function addSubs(names, videos, subsPT, subsEN){
  first(0)

  function first(i){
    exec( cmd(names[i], videos[i], subsPT[i], subsEN[i], i) , (err, output) => {
      if (err) {
        throw console.error("could not execute command: ", err)
      }
  
      console.log("Foi o: " + names[i])
      if(videos[i + 1]) first(i+1)
    })
  }
}

function cmd(name, video, pt, en, i){
  const files = `"files/input/videos/${video}" -i "files/input/pt/${pt}" -i "files/input/en/${en}" \ `
  const options = '-c:v copy -c:a copy -c:s mov_text \ -map 0:v -map 0:a -map 1 -map 2 \ '
  const language = '-metadata:s:s:0 language=por -metadata:s:s:1 language=eng '
  const output = `"files/output/${numberEp(i)} - ${name}.mp4"`

  return 'ffmpeg -y -i '+ files + options + language + output;
} 

function numberEp(i){
  if(i < 9) return '0'+ (i + 1)
  else return String(i + 1)
}


module.exports = addSubs
