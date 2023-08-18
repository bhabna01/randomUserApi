const fs = require('fs');
const dataFilePath = './data.json';

function readDataFile() {
    try {
        const rawData = fs.readFileSync(dataFilePath);
        return JSON.parse(rawData);
    } catch (error) {
        return [];
    }
}

function writeDataFile(data) {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}

module.exports = {
    readDataFile,
    writeDataFile,
};
