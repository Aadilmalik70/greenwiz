// Web Scrapping using Node js and Cherio Request
// npm install cherio
// npm install request

// Imports 
const cherio = require('cherio');
const request = require('request');
const fs = require('fs');
const download = require('image-downloader');
const imageDownloader = require('node-image-downloader')

// Create a Write Stream 
var WriteStream = fs.createWriteStream("ImagesLink.txt", "UTF-8");



request('https://www.growpital.com/', (err, resp, html) => {

  if (!err && resp.statusCode == 200) {
    console.log("Request was success ");

    // Define Cherio or $ Object 
    const $ = cherio.load(html);

    $("img").each((index, image) => {

      var img = $(image).attr('src').split("//")[1];
      var Links = "https://" + img;
      console.log("src", Links)
      imageDownloader({
        imgs: [
          {
            uri: Links
          }
        ], dest: './images',
      })
        .then((info) => {
          console.log('all done', info)
        })
        .catch((error, response, body) => {
          console.log('something goes bad!')
          console.log(error)
        })
      WriteStream.write(Links);
      WriteStream.write("\n");
    });
  } else {
    console.log("Request Failed ", err);
  }

});


