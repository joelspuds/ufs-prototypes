'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tinyMCEApplicationIndexGet = tinyMCEApplicationIndexGet;
exports.tinyMCEApplicationGet = tinyMCEApplicationGet;
exports.tinyMCEApplicationPost = tinyMCEApplicationPost;
exports.tinyMCEApplicationViewGet = tinyMCEApplicationViewGet;
// suggested learning full list GET
// This is the fuller version with

function tinyMCEApplicationIndexGet(req, res) {
  let viewData;

  return res.render('prototypes/example-journey/application/index', viewData);
}

function tinyMCEApplicationGet(req, res) {
  let viewData, storedSpeakerNotes;

  storedSpeakerNotes = req.session.speakerNotes;

  console.log('storedSpeakerNotes = ' + storedSpeakerNotes);

  viewData = {
    storedSpeakerNotes
  };

  return res.render('prototypes/example-journey/application/start', viewData);
}

function tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;

  console.log('speakerNotes = ' + speakerNotes);

  let storedSpeakerNotes = req.session.speakerNotes;

  if (speakerNotes) {
    req.session.speakerNotes = speakerNotes;
  } else {
    req.session.speakerNotes = storedSpeakerNotes;
  }

  return res.redirect('/prototypes/example-journey/application/view');
}

// view page
function tinyMCEApplicationViewGet(req, res) {
  let viewData, speakerNotes;

  speakerNotes = req.session.speakerNotes;

  console.log('From view page: ' + speakerNotes);

  viewData = { speakerNotes };
  return res.render('prototypes/example-journey/application/view', viewData);
}