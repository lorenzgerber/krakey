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

  // Generating Report
  const cliInter = require ('./runSankey.js');
  cliInter.runSankey(sampleFile.name);
});

app.get('/sankey/:id', function (req, res) {

  const rm = require ('./removeFile.js');
    
  var requestedFile = req.params.id;
  
  const fs = require('fs');
  reportHtml = './' + requestedFile;
  console.log(reportHtml);

  var absoluteReportHtml = '/home/testuser/' + requestedFile
  var basename = absoluteReportHtml.substr(0, absoluteReportHtml.lastIndexOf('.')) || absoluteReportHtml;
  var report = basename + '.report';
  console.log(report)

  let checkFileExists = s => new Promise(r=>fs.access(s, fs.F_OK, e => r(!e))); 
  checkFileExists(reportHtml)
  .then(function(){
    res.sendFile(absoluteReportHtml);
  }).then(function(){
    rm.removeFile(report);
  }).then(function(){
    res.on("finish", () => rm.removeFile(absoluteReportHtml))
  });

})



app.listen(8000, function() {
  console.log('Express server listening on port 8000'); // eslint-disable-line
});

