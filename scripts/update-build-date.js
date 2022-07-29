const fs = require('fs');
let path = require('path');
const envFolder = 'src/environments';

void main();

async function main() {
  const files = getEnvFiles();
  files.forEach((file) => {
    updateBuildDate(`${envFolder}/${file}`);
  });
}

function getEnvFiles() {
  const files = [];
  fs.readdirSync(envFolder).forEach((file) => {
    files.push(file);
  });
  return files;
}

function updateBuildDate(file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      return console.log(err);
    }

    const localDate = new Date();
    localDate.setMinutes(localDate.getMinutes() - localDate.getTimezoneOffset());
    const date = localDate.toISOString().replace('T', ' ').slice(0, 16).replace(/-/g, '.');

    data = data.replace(/releaseDate:.*\n/g, `releaseDate: '${date}',\n`);
    const version = data.match(/releaseVersion.*(\.\d+\.\d+)['"]/);
    if (version && version[1]) {
      const newVersion = getVersion();
      data = data.replace(/(releaseVersion.*)\.\d+\.\d+(['"])/, `$1.${newVersion}$2`);
    }
    console.log(`Updating build date to ${date} in ${file}`);

    fs.writeFile(file, data, 'utf8', function (err) {
      if (err) return console.log(err);
    });
  });
}

function getDayOfYear() {
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now - start;
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}

function getVersion() {
  const now = new Date();
  const midnight = new Date().setHours(0, 0, 0, 0);
  const lastYearDigit = `${now.getFullYear()}`.substring(-1, 1);
  const minutesSinceMidnight = Math.floor((now - midnight) / 1000 / 60);
  return `${lastYearDigit}.${getDayOfYear()}${minutesSinceMidnight}`;
}
