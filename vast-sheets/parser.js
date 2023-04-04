const fs = require('fs');
const { type } = require('os');

function readFile(filepath) {
  const fileContents = fs.readFileSync(`../${filepath}`, 'utf-8');
  const blocks = fileContents.split(/\r?\n\r?\n/);
  const data = [];

  blocks.forEach((block) => {
    const lines = block.trim().split(/\r?\n/);
    const obj = {};

    lines.forEach((line) => {
      const [key, value] = line.split(': ');
      obj[key] = value ? value.trim() : '';
    });

    data.push(obj);
  });

  return data;
}

const data = readFile('vast.txt');
module.exports = data;