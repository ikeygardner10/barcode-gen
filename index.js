const fs = require('fs-extra');
const request = require('request');
const axios = require('axios');
const xlsx = require('node-xlsx');

const file = xlsx.parse(fs.readFileSync(__dirname + '/Book1.xlsx'));
const data = file[0].data;

const filePath = 'C:/Users/Ikey/Downloads/Temp/barcodes/';
const urlP1 = `http://bwipjs-api.metafloor.com/?bcid=code128&text=`;
 const urlP2 = '&scale=5&includetext';

const fileDownload = async(URI, fileName, filePath) => {
    try {
        console.info(`Checking for file ${fileName}`);
        if(fs.existsSync(`${filePath}${fileName}`)) return;
        console.info(`Downloading barcode ${fileName}`);
        console.info(`${filePath}${fileName}`);
        return request(URI)
            .on('error', console.error)
            .pipe(fs.createWriteStream(`${filePath}${fileName}`));
    } catch(error) {
        console.error(`${error.stack}`)
    }
};

const webGet = (img) => {
    axios.get(`${urlP1}${img}${urlP2}`)
        .then(res => {
            console.log(res);
            return fileDownload(`${urlP1}${img}${urlP2}`, `${img}.png`, `${filePath}`);
        })
        .catch(err => {
            return console.log(err.stack);
        });
};

// data.forEach(arr => {
//     arr.forEach(a => {
//         if(fs.existsSync(`${filePath}${a}.png`)) return console.log(`${a}.png exists`);
//         webGet(a);
//         setTimeout(function() {
//             console.log('Waiting 3 seconds');
//         }, 3000);
//     });
// });