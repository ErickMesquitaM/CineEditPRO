const fs = require('fs');

function finish(repeat, videos, i, err) {
  if (err) throw console.error(err);

  console.log('');

  if(videos[i + 1]){

    setTimeout(() => {
      fs.appendFileSync('log.txt', `\n ---------------------------------------------- \n` );
      repeat(i + 1);

    }, 2000);

  } else {
    fs.appendFileSync('log.txt', `\n ============================================== \n` );
    console.log('✅ TODOS ACABADOS ✅');
    console.log('');
  };
};


module.exports = finish;