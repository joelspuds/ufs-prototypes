'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.embeddedPDFGet = embeddedPDFGet;
exports.embeddedPDFPost = embeddedPDFPost;
exports.embeddedPDFViewGet = embeddedPDFViewGet;
exports.embeddedPDFStartGet = embeddedPDFStartGet;
exports.embeddedPDFStartPost = embeddedPDFStartPost;
exports.embeddedPDFViewPDFGet = embeddedPDFViewPDFGet;
// suggested learning full list GET

function embeddedPDFGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/example-journey/embedded-pdf/index', viewData);
}

function embeddedPDFPost(req, res) {
  const { inputUploadPDF } = req.body;

  // console.log(formUploadPDF);
  console.log(inputUploadPDF);

  console.log(req.body);

  let Busboy = require('busboy');
  console.log(Busboy);

  // let formidable = require('formidable');
  // var fs = require('fs');

  // let form = new formidable.IncomingForm();

  // console.log(form);

  // form.parse(req, function (err, fields, files) {
  //   res.write('File uploaded');
  //   res.end();
  // });

  /*let multer = require('multer');
   let storage =  multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, './uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + '-' + Date.now());
    }
  });
   let upload = multer({ storage : storage}).single('fileUpload');
   upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");
  });
   // return res.redirect('/prototypes/example-journey/embedded-pdf/view');
  console.log('upload process complete');*/
  return res.redirect('/prototypes/example-journey/embedded-pdf/');
}

// view page
function embeddedPDFViewGet(req, res) {
  let viewData;

  viewData = {};
  return res.render('prototypes/example-journey/embedded-pdf/view', viewData);
}

// newer page
function embeddedPDFStartGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/example-journey/embedded-pdf/start', viewData);
}

function embeddedPDFStartPost(req, res) {
  const { inputUploadPDF } = req.body;

  // console.log(inputUploadPDF);
  // console.log(req.body);

  // let busboy = require('busboy');
  // let formidable = require('formidable');
  // let fs = require('fs');
  // let path = ('/dist/assets/files');
  // let uploadedFile = fs.readFileSync(inputUploadPDF);
  // let uploadPath = 'home/joels/'

  // console.log(uploadedFile);
  // console.log(formidable);

  // busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
  /*busboy.on('file', function(inputUploadPDF, file, filename, encoding, mimetype) {
    var saveTo = path.join(os.tmpDir(), path.basename(fieldname));
    file.pipe(fs.createWriteStream(saveTo));
  });
  busboy.on('finish', function() {
    res.writeHead(200, { 'Connection': 'close' });
    res.end("That's all folks!");
  });
  return req.pipe(busboy);*/

  return res.redirect('/prototypes/example-journey/embedded-pdf/start-uploaded');
}

// view page
function embeddedPDFViewPDFGet(req, res) {
  let viewData;

  viewData = {};
  return res.render('prototypes/example-journey/embedded-pdf/view-pdf', viewData);
}