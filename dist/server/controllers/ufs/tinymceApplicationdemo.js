'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tinyMCEApplicationIndexGet = tinyMCEApplicationIndexGet;
exports.tinyMCEApplicationGet = tinyMCEApplicationGet;
exports.tinyMCEApplicationPost = tinyMCEApplicationPost;
exports.tinyMCEApplicationViewGet = tinyMCEApplicationViewGet;
exports.tinyMCEApplicationStaticViewGet = tinyMCEApplicationStaticViewGet;
// suggested learning full list GET
// This is the fuller version with

// let caseForSupportData = require('./case-for-support');

const cheerio = require('cheerio');
let caseForSupportData = require('./case-for-support-2');

function tinyMCEApplicationIndexGet(req, res) {
  let viewData;

  return res.render('prototypes/example-journey/application/index', viewData);
}

function tinyMCEApplicationGet(req, res) {
  let viewData, storedSpeakerNotes;

  storedSpeakerNotes = req.session.speakerNotes;

  // console.log('storedSpeakerNotes = ' + storedSpeakerNotes);

  viewData = {
    storedSpeakerNotes
  };

  return res.render('prototypes/example-journey/application/start', viewData);
}

function tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;

  // console.log('speakerNotes = ' + speakerNotes);

  let cleanContent;

  // sanitise
  let $ = cheerio.load(speakerNotes);

  $('h1, h2, h3, h4, p, span, div').each(function () {
    this.attribs = {};
    // this.style = {};
    // this.removeAttr('style');
  });

  /*$('a').each(function() {
    this.remove();
  });*/

  $('a').each(function () {
    // this.remove();
  });

  $('h1, h2').each(function () {
    // this.attr('id', 'marker_' + this.text);
    // this.class('test');
    // let newID = 'marker_' + this.closest('span').text();

    // console.log('newID = ' + newID);
    console.log('this = ' + this);
    console.log(this);
    // this.attribs = {'id': newID};
  });

  cleanContent = $.html();

  let storedSpeakerNotes = req.session.speakerNotes;

  if (cleanContent) {
    req.session.speakerNotes = cleanContent;
  } else {
    req.session.speakerNotes = storedSpeakerNotes;
  }

  return res.redirect('/prototypes/example-journey/application/view');
}

// view page
function tinyMCEApplicationViewGet(req, res) {
  let viewData, speakerNotes;

  speakerNotes = req.session.speakerNotes;

  // console.log('From view page: ' + speakerNotes);

  viewData = { speakerNotes };
  return res.render('prototypes/example-journey/application/view', viewData);
}

// pre-populated view page
function tinyMCEApplicationStaticViewGet(req, res) {
  let viewData, caseForSupport;

  caseForSupport = caseForSupportData.caseForSupport2;

  var $ = cheerio.load(caseForSupport);

  $('h1, h2, h3, h4, p, span, div').each(function () {
    this.attribs = {};
    // this.style = {};
    // this.removeAttr('style');
  });

  caseForSupport = $.html();

  viewData = {
    caseForSupport
  };

  return res.render('prototypes/example-journey/application/view-static', viewData);
}