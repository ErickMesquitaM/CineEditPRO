const fs = require('fs');

const parser = require('subtitles-parser-vtt');
const moment = require('moment');


async function synchronization(path, sub, argv) {

  return new Promise( async (resolve, reject) => {

    const srt = fs.readFileSync(`./files/subs/${path}/${sub}`, 'utf8');

    var dataMs = parser.fromVtt(srt);


    dataMs.forEach(subtitle => {

      const start = moment(subtitle.startTime, 'HH:mm:ss,SSS');
      const startMs = start.add(argv, 'milliseconds');
      const startTime = startMs.format('HH:mm:ss,SSS');

      const end = moment(subtitle.endTime, 'HH:mm:ss,SSS');
      const endMs = end.add(argv, 'milliseconds');
      const endTime = endMs.format('HH:mm:ss,SSS');

      subtitle.startTime = startTime;
      subtitle.endTime = endTime;

    });

    var srt_string = parser.toVtt(dataMs);


    fs.writeFileSync(`./files/output/${path}/${sub}`, srt_string);

    resolve();
  });
};



module.exports = synchronization;