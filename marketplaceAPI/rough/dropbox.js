//require('isomorphic-fetch'); // or another library of choice.
var Dropbox = require('dropbox').Dropbox;
const fs = require('fs');
const path = require('path');
var dbx = new Dropbox({ accessToken: 'sl.Bce8-hh6HDJl2KmrfCi8jtqTFCWUWc8XTcOCa83GyMO1yV3tLg3xpNBKmLfqP770_GrT-WAgqbEnyMkO7epe2WdSI-x30YC24o_7TVsayP_ODngp_tVlO61nZEGdYU60yFRYWz2d'});
// dbx.filesListFolder({path: ''})
//   .then(function(response) {
//     console.log(response);
//   })
//   .catch(function(error) {
//     console.log(error);
//   });
//   const dbx = new Dropbox({ accessToken: result.accessToken });
  // dbx.filesListFolder({ path: '' })
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
  fs.readFile(path.join(__dirname, '/connectDB.js'), (err, contents) => {
    if (err) {
      console.log('Error: ', err);
    }
    dbx.filesUpload({ path: '/user/index.js', contents })
    .then((response) => {
      console.log(response);
    })
    .catch((uploadErr) => {
      console.log(uploadErr);
    });
  })