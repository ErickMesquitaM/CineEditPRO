const fs = require('fs');
const path = require('path');

const axios = require('axios');

require('dotenv').config();

const name = process.argv[2];

const apiKey = process.env.TMDB_API_KEY;



( async () => {

  var id, season;

  await axios.get(`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=${name}`)
   .then(response => {
    const results = response.data.results;
 
    if (results.length > 0) {
      id = results[0].id;

    } else {
      console.log(`Nenhuma série encontrada com o título "${name}"`);
 
    }
   })
   .catch(error => {
    console.log(error);
   });



  await axios.get(`https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}`)
   .then(response => {

     console.log('name: '+response.data.name );
     console.log('first_air_date: '+response.data.first_air_date );
     console.log('genre: '+response.data.genres[0].name );
     console.log('seasons: '+response.data.number_of_seasons );

     fs.appendFileSync('log.txt', `\n\n ${response.data.name} \n` );

     season = response.data.number_of_seasons;

    })
   .catch(error => {
     console.log(error);
    });

  for(i = 1; i <= season; i++){

    var text = ''

    await axios.get(`https://api.themoviedb.org/3/tv/${id}/season/${i}?api_key=${process.env.TMDB_API_KEY}`)
     .then(response => {
      response.data.episodes.map( (episode, index) => {
        text += episode.name;

        if(index + 1 < response.data.episodes.length ) text += '\n'
      });

     })
     .catch(error => {
      console.log(error);
     });
    fs.appendFileSync('log.txt', `\n Temporada ${i} ` );

    const filePath = path.join('files/output', 'Season '+i+'.txt');

    fs.writeFileSync(filePath, text );

  };

  fs.appendFileSync('log.txt', `\n =============================================== ` );
  console.log('');
})();