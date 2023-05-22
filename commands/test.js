// const { exec } = require('child_process');
// const fs = require('fs');

// const { extVideos } = require('../utils/ext');
// const getExt = require('../utils/getExt');


// const videos = fs.readdirSync(`./files/movies/`);

// getInfo(0)


// async function getInfo(i){
//   var pathMovie = '';

//   if(videos[i]){
//     var path = videos[i];

//     const files = fs.readdirSync(`./files/movies/${path}`);

//     const video = files.find( file => extVideos.includes( getExt(file) ) )

//     pathMovie = `files/movies/${path}/${video}`;

//     console.log('')
//     console.log('')
//     console.log(path)
//     console.log('')

  
//     exec(`ffprobe -v quiet -print_format json -show_format -show_streams "${pathMovie}"`, (err, stdout) => {
      
//       if (err) {
//         console.error(err);
//         return reject();
//       };
    
//       const videoInfo = JSON.parse(stdout);
  
//       videoInfo.streams.map(info => console.log(info.codec_type))

          
//       if(videos[i+1]){
//         getInfo(i+1);

//       } else {
//         console.log('');
//         console.log('acabo');
//         console.log('');
//       };

//     });
//   };
// };


var options = null;

if( process.argv[2] ){
  options = JSON.parse(process.argv[2])
};

// '[{\"season\": \"Season 2\", \"index\": 9}, {\"season\": \"Season 3\", \"index\": 2}]'

console.log(options)