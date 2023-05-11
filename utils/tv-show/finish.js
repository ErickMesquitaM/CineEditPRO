const fs = require('fs');

function finish(nextEp, nextSeason, videos, seasons, iEp, iSe, started, epInit, err) {
  if (err) throw console.error(err);

  console.log('');

  if(videos[iEp + 1]){
    fs.appendFileSync('log.txt', `\n +++++++++++++++++++++++++++++++++++++++++++++++++ \n \n` );
    started ? nextEp(iEp + 1, epInit) : nextEp(iEp + 1);

  } else if(seasons[iSe + 1]) {
    fs.appendFileSync('log.txt', `\n ------------------------------------------------- \n \n` );
    console.log('  ✅ ✅  ');
    console.log('');
    console.log('');
    nextSeason(iSe + 1);
    
  } else {
    fs.appendFileSync('log.txt', `\n ================================================= \n \n \n \n` );
    console.log('✅ TODOS ACABADOS ✅');
    console.log('');
  };
};


module.exports = finish;