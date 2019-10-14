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
exports.caseForSupportGet = caseForSupportGet;
exports.caseForSupportPost = caseForSupportPost;
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
let generalData = require('./data');

// ************************************************************************
//
//       Application overview
//
// ************************************************************************

function tinyMCEApplicationIndexGet(req, res) {
  let viewData, hasBeenUpdated, projectDetails, teamHasBeenUpdated, caseHasBeenUpdated, capabilityHasBeenUpdated, ethicalHasBeenUpdated, resourcesHasBeenUpdated;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  let progressPercentage = 0;

  // console.log(projectDetails);

  projectDetails = req.session.projectDetails;
  hasBeenUpdated = req.session.hasBeenUpdated;
  teamHasBeenUpdated = req.session.teamHasBeenUpdated;
  caseHasBeenUpdated = req.session.caseHasBeenUpdated;
  capabilityHasBeenUpdated = req.session.capabilityHasBeenUpdated;
  ethicalHasBeenUpdated = req.session.ethicalHasBeenUpdated;
  resourcesHasBeenUpdated = req.session.resourcesHasBeenUpdated;

  req.session.hasBeenUpdated = null;

  if (projectDetails) {
    progressPercentage = progressPercentage + 16.66666666666;
  }
  if (teamHasBeenUpdated) {
    progressPercentage = progressPercentage + 16.66666666666;
  }
  if (caseHasBeenUpdated) {
    progressPercentage = progressPercentage + 16.66666666666;
  }
  if (capabilityHasBeenUpdated) {
    progressPercentage = progressPercentage + 16.66666666666;
  }
  if (ethicalHasBeenUpdated) {
    progressPercentage = progressPercentage + 16.66666666666;
  }
  if (resourcesHasBeenUpdated) {
    progressPercentage = progressPercentage + 16.66666666666;
  }

  progressPercentage = progressPercentage.toFixed(0);
  if (progressPercentage > 95) {
    progressPercentage = 100;
  }

  hasBeenUpdated = null;

  viewData = {
    projectName,
    hasBeenUpdated,
    projectDetails,
    teamHasBeenUpdated,
    caseHasBeenUpdated,
    capabilityHasBeenUpdated,
    ethicalHasBeenUpdated,
    resourcesHasBeenUpdated,
    progressPercentage
  };

  return res.render('prototypes/example-journey/application/index', viewData);
}

// ************************************************************************
//
//       Old case-for-support page
//
// ************************************************************************
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

// ************************************************************************
//
//       VIEW DYNAMIC
//
// ************************************************************************
function tinyMCEApplicationViewGet(req, res) {
  let viewData, notesCaseForSupport, notesCapability, notesResources, notesEthical, notesCosts, costsStaff, costsOverheads, costsMaterials, ethicalReasons;

  notesCaseForSupport = req.session.caseForSupportNotes;
  notesCapability = req.session.storedCapabilityToDeliverNotes;
  notesResources = req.session.notesResources;
  notesEthical = req.session.ethicalNotes;
  ethicalReasons = req.session.ethicalReasons;
  notesCosts = req.session.projectCosts;
  costsStaff = req.session.costsStaff;
  costsOverheads = req.session.costsOverheads;
  costsMaterials = req.session.costsMaterials;

  viewData = {
    notesCaseForSupport,
    notesCapability,
    notesResources,
    notesEthical,
    notesCosts,
    costsStaff,
    costsOverheads,
    costsMaterials,
    ethicalReasons
  };
  return res.render('prototypes/example-journey/application/view', viewData);
}
// ************************************************************************
//
//        pre-populated view page VIEW STATIC
//
// ************************************************************************
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
// ************************************************************************
//
//        PROJECT DETAILS
//
// ************************************************************************
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
// ************************************************************************
//
//        Application team
//
// ************************************************************************
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

function applicationTeamPost(req, res) {
  req.session.hasBeenUpdated = true;
  req.session.teamHasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}

// ************************************************************************
//
//        CASE FOR SUPPORT
//
// ************************************************************************
function caseForSupportGet(req, res) {
  let viewData, storedCaseForSupportNotes;

  storedCaseForSupportNotes = req.session.caseForSupportNotes;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    storedCaseForSupportNotes,
    projectName
  };

  return res.render('prototypes/example-journey/application/case-for-support', viewData);
}

function caseForSupportPost(req, res) {
  const { caseForSupportNotes } = req.body;

  req.session.caseForSupportNotes = caseForSupportNotes;
  req.session.caseHasBeenUpdated = true;
  req.session.hasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}
// ************************************************************************
//
//        Capability to deliver
//
// ************************************************************************
function capabilityToDeliverGet(req, res) {
  let viewData, capabilityToDeliverNotes;

  capabilityToDeliverNotes = req.session.storedCapabilityToDeliverNotes;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName,
    capabilityToDeliverNotes
  };

  return res.render('prototypes/example-journey/application/capability-to-deliver', viewData);
}

function capabilityToDeliverPost(req, res) {
  const { capabilityToDeliverNotes } = req.body;

  req.session.storedCapabilityToDeliverNotes = capabilityToDeliverNotes;
  req.session.hasBeenUpdated = true;
  req.session.capabilityHasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}
// ************************************************************************
//
//        Resources and costs
//
// ************************************************************************
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

function resourcesCostPost(req, res) {
  const { projectCosts, costsStaff, costsOverheads, costsMaterials } = req.body;

  let newCostsStaff, newCostsOverheads, newCostsMaterials;
  newCostsStaff = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsStaff);
  newCostsOverheads = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsOverheads);
  newCostsMaterials = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsMaterials);

  console.log('newCostsStaff = ' + newCostsStaff);

  req.session.projectCosts = projectCosts;
  req.session.costsStaff = newCostsStaff;
  req.session.costsOverheads = newCostsOverheads;
  req.session.costsMaterials = newCostsMaterials;
  req.session.hasBeenUpdated = true;
  req.session.resourcesHasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}

// ************************************************************************
//
//        ethical and societal
//
// ************************************************************************
function ethicalSocietalGet(req, res) {
  let viewData, ethicalReasons;

  ethicalReasons = generalData.ethicalReasons;

  console.log(ethicalReasons);

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName,
    ethicalReasons
  };

  return res.render('prototypes/example-journey/application/ethical-and-societal-issues', viewData);
}

function ethicalSocietalPost(req, res) {
  const { ethicalReasons, ethicalNotes } = req.body;

  console.log(req.body);

  req.session.ethicalReasons = ethicalReasons;
  req.session.ethicalNotes = ethicalNotes;
  req.session.hasBeenUpdated = true;
  req.session.ethicalHasBeenUpdated = true;

  return res.redirect('/prototypes/example-journey/application/');
}