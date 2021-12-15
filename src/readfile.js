const fs = require('fs');

const readFile = (file) => {
  return fs.readFileSync(file, 'utf8')
    .trim()
    .split(/[\r\n]+/g)
    .map(line => {
      try {
        const information = line.split('=');
        return { employee: information[0], schedules: information[1].split(',') };
      } catch (err) {
        return null;
      }
    })
    .filter(object => {
      return !!object;
    });
}

module.exports = readFile;
