'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tinyMCEApplicationIndexGet = tinyMCEApplicationIndexGet;
exports.tinyMCEApplicationGet = tinyMCEApplicationGet;
exports.tinyMCEApplicationPost = tinyMCEApplicationPost;
exports.tinyMCEApplicationViewGet = tinyMCEApplicationViewGet;
exports.tinyMCEApplicationStaticViewGet = tinyMCEApplicationStaticViewGet;
exports.projectDetailsGet = projectDetailsGet;
exports.projectDetailsPost = projectDetailsPost;
exports.applicationTeamGet = applicationTeamGet;
exports.applicationTeamPost = applicationTeamPost;
exports.capabilityToDeliverGet = capabilityToDeliverGet;
exports.capabilityToDeliverPost = capabilityToDeliverPost;
exports.resourcesCostGet = resourcesCostGet;
exports.resourcesCostPost = resourcesCostPost;
exports.ethicalSocietalGet = ethicalSocietalGet;
exports.ethicalSocietalPost = ethicalSocietalPost;
// suggested learning full list GET
// This is the fuller version with

const cheerio = require('cheerio');
let caseForSupportData = require('./case-for-support-2');
const untitledProjectName = 'Untitled project';

function tinyMCEApplicationIndexGet(req, res) {
  let viewData, hasBeenUpdated, projectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  // console.log(projectDetails);

  projectDetails = req.session.projectDetails;
  hasBeenUpdated = req.session.hasBeenUpdated;
  req.session.hasBeenUpdated = null;

  viewData = {
    projectName,
    hasBeenUpdated,
    projectDetails
  };

  return res.render('prototypes/example-journey/application/index', viewData);
}

function tinyMCEApplicationGet(req, res) {
  let viewData, storedSpeakerNotes;

  storedSpeakerNotes = req.session.speakerNotes;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    storedSpeakerNotes,
    projectName
  };

  return res.render('prototypes/example-journey/application/start', viewData);
}

function tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;

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
    // console.log('this = ' + this);
    // console.log(this);
    // let subStuff = this;
    // subStuff.each(function() {});
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

  $('p, span, div').each(function () {
    this.attribs = {};
  });

  $('h1, h2, h3, h4').each(function () {
    // var existingID = $(this).attr('id');
    // this.attribs = {
    //   'id': existingID,
    //   'style':'test',
    // };
  });

  caseForSupport = $.html();

  viewData = {
    caseForSupport
  };

  return res.render('prototypes/example-journey/application/view-static', viewData);
}

// rest of application journey sections

// PROJECT DETAILS
function projectDetailsGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName
  };

  return res.render('prototypes/example-journey/application/project-details', viewData);
}

function projectDetailsPost(req, res) {
  const { projectName, projectSummary, projectDuration, day, month } = req.body;

  // console.log('projectName = ' + projectName);

  let allProjectDetails = {
    projectName,
    projectSummary,
    projectDuration,
    day,
    month
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}

// Application team
function applicationTeamGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName
  };

  return res.render('prototypes/example-journey/application/application-team', viewData);
}

function applicationTeamPost(req, res) {}

// >>> Case for support above

// Capability to deliver
function capabilityToDeliverGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName
  };

  return res.render('prototypes/example-journey/application/capability-to-deliver', viewData);
}

function capabilityToDeliverPost(req, res) {}

// Resources and costs
function resourcesCostGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName
  };

  return res.render('prototypes/example-journey/application/resources-and-cost', viewData);
}

function resourcesCostPost(req, res) {}

// ethical and societal
function ethicalSocietalGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName
  };

  return res.render('prototypes/example-journey/application/ethical-and-societal-issues', viewData);
}

function ethicalSocietalPost(req, res) {}