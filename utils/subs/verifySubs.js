const fs = require('fs');

async function verifySubs(path, subsVideo, subs) {

  let groups = {};
  
  subsVideo.forEach( sub => {
    let lang = sub.split("_")[0];
  
    if (groups[lang]) {
      groups[lang].push(sub);

    } else {
      groups[lang] = [sub];

    }
  });


  for (let sub in groups) {

    return new Promise( async (resolve, reject) => {

      let subsOfGroup = groups[sub];
      let sizes = [];

      const promise = subsOfGroup.map( sub => {


        return new Promise( (resolve, reject) => {

          const stats = fs.statSync(`${path}/${sub}`);
          const subSize = stats.size;

          sizes.push( subSize )

          resolve();
        });
      });

      await Promise.all(promise);

      let bigger = Math.max(...sizes);
      let index = sizes.indexOf(bigger);

      subs.push(subsVideo[index])
      
      resolve();
    });
  };
};


module.exports = verifySubs;