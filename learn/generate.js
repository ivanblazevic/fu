var axios = require('axios');
var textural = require('textural-js');
var fs = require('fs');

const dir = "_posts";

const instance = axios.create({
  baseURL: 'https://radix-83cd.restdb.io/rest/tuts',
  timeout: 5000,
  headers: {'x-apikey': '5ae89d7625a622ae4d528762', 'content-type': 'application/json', 'cache-control': 'no-cache'}
});

function getText(id, name) {
  const result = '---\nlayout: post\ntitle:  \"'+ 
  name + '\"' + 
  '\ndate:   2019-03-09 19:50:44 +0100\n' + 
  'categories: css maps\n' +
  'tags: [google, marker, custom, pointer, css]\n---\n' + 
  'In the tutorial bellow you\'ll find how to create ' + name.toLowerCase() + ' with CSS \n\n' + 
  '<div id=\"csstutor\" data-height=\"470\" data-href=\"' + id +'\"><\/div>\n' + 
  '<script src=\"https:\/\/frontendundefined.com\/learn\/eb.js\"><\/script>\n\n';

  return result;
}

instance.get("").then(r => {
  r.data.forEach(element => {
    if (element.name) {
      const path = new textural(element.name).format("slug").toLowerCase();
      const fileName = dir + "/" + "2019-03-16-" + "how-to-css-" + path + '.markdown';
      const text = getText(element._id, element.name);
      
      try {
        fs.unlinkSync(fileName, function (err) {
          if (err) throw err;
          console.log('File deleted!');
        });
      } catch (error) {
        console.log("Looks like a new file..."); 
      }

      fs.appendFileSync(fileName, text, function (err) {
        if (err) throw err;
      });
    }
  });
})
