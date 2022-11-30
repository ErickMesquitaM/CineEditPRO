const { exec } = require("child_process");

function addSubs(names, videos, subsPT, subsEN){
  edit(0)

  function edit(i){

    console.log(numberEp(i) + ' - ' + names[i])

    const progress = exec( cmd(names[i], videos[i], subsPT[i], subsEN[i], i) , (err, output) => {
      if (err) throw console.error(err)

      console.log('   ✅')
      console.log('')

      if(videos[i + 1]) edit(i+1)
    })

    
    progress.stderr.on('data', data => {
      var words = data.split(' ');
      var numberIndex = words.findIndex( (word) => word.startsWith('time') );

      if(numberIndex !== -1){
        process.stdout.clearLine(0);
        process.stdout.cursorTo(0);
        process.stdout.write( words[numberIndex].slice(5) );
      }
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