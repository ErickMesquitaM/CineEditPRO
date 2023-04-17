
function finish(next, videos, i, err) {
  if (err) throw console.error(err);

  console.log('');

  if(videos[i + 1]){
    next(i + 1);

  } else {
    console.log('✅ TODOS ACABADOS ✅');
    console.log('');
  };
};


module.exports = finish;