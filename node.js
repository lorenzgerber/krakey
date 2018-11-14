#!/usr/bin/env nodejs

// How to upload Files using Curl
// curl -k -X POST -F "sampleFile=@test.txt" "http://localhost:8000/upload"
// wget localhost:8000/sankey/test.html


const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

// default options
app.use(fileUpload());

app.post('/upload', function(req, res) {
  if (Object.keys(req.files).length == 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.sampleFile;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(sampleFile.name, function(err) {
    if (err)
      return res.status(500).send(err);

    res.send('File uploaded!');
  });

  const cliInter = require ('./runDocker.js');
  cliInter.runDocker(sampleFile.name);

  
});

app.get('/sankey/:id', function (req, res) {
    
  var requestedFile = req.params.id;
  
  const fs = require('fs')
  reportHtml = './' + requestedFile;
  console.log(reportHtml)

  absoluteReportHtml = '/home/testuser/' + requestedFile
  
  let checkFileExists = s => new Promise(r=>fs.access(s, fs.F_OK, e => r(!e))); 
  checkFileExists(reportHtml).then(res.sendFile(absoluteReportHtml));
})



app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});

