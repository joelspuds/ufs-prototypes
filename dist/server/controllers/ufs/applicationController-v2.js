'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.appV2AHRCOpportunityGet = appV2AHRCOpportunityGet;
exports.appV2AHRCOpportunityPost = appV2AHRCOpportunityPost;
exports.appV2tinyMCEApplicationIndexGet = appV2tinyMCEApplicationIndexGet;
exports.appV2tinyMCEApplicationViewGet = appV2tinyMCEApplicationViewGet;
exports.appV2DetailsGet = appV2DetailsGet;
exports.appV2DetailsPost = appV2DetailsPost;
exports.appV2EligibilityApplicantGet = appV2EligibilityApplicantGet;
exports.appV2EligibilityApplicantPost = appV2EligibilityApplicantPost;
exports.appV2EligibilityResearchAreaGet = appV2EligibilityResearchAreaGet;
exports.appV2EligibilityResearchAreaPost = appV2EligibilityResearchAreaPost;
exports.appV2CurrentResearchActivityGet = appV2CurrentResearchActivityGet;
exports.appV2CurrentResearchActivityPost = appV2CurrentResearchActivityPost;
exports.appV2ResearchHistoryGet = appV2ResearchHistoryGet;
exports.appV2ResearchHistoryPost = appV2ResearchHistoryPost;
exports.appV2ReviewGet = appV2ReviewGet;
exports.appV2ReviewPost = appV2ReviewPost;
exports.appV2caseForSupportGet = appV2caseForSupportGet;
exports.appV2caseForSupportPost = appV2caseForSupportPost;
exports.appV2AddApplicantGet = appV2AddApplicantGet;
exports.appV2AddApplicantPost = appV2AddApplicantPost;

var _createOpportunityV = require('./createOpportunity-v3');

var demosController = _interopRequireWildcard(_createOpportunityV);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// const cheerio = require('cheerio');

const untitledProjectName = 'Untitled project'; // suggested learning full list GET
// This is the fuller version with

let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       AHRC opportunity
//
// ************************************************************************

function appV2AHRCOpportunityGet(req, res) {
  let viewData;

  return res.render('prototypes/application-v2/ahrc-opportunity', viewData);
}

function appV2AHRCOpportunityPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/application-v2/ahrc-opportunity');
}

// ************************************************************************
//
//       Application overview
//
// ************************************************************************

function appV2tinyMCEApplicationIndexGet(req, res) {
  let viewData, hasBeenUpdated, projectDetails, teamHasBeenUpdated, capabilityHasBeenUpdated, resourcesHasBeenUpdated, projectDetailsIsComplete, applicantIsComplete, researchIsComplete, activityIsComplete, historyIsComplete, reviewIsComplete;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  // console.log(projectDetails);

  projectDetails = req.session.projectDetails;
  hasBeenUpdated = req.session.hasBeenUpdated;
  teamHasBeenUpdated = req.session.teamHasBeenUpdated;

  capabilityHasBeenUpdated = req.session.capabilityHasBeenUpdated;
  resourcesHasBeenUpdated = req.session.resourcesHasBeenUpdated;

  req.session.hasBeenUpdated = null;

  projectDetailsIsComplete = req.session.projectDetailsIsComplete;
  applicantIsComplete = req.session.applicantIsComplete;
  researchIsComplete = req.session.researchIsComplete;
  activityIsComplete = req.session.activityIsComplete;
  historyIsComplete = req.session.historyIsComplete;
  reviewIsComplete = req.session.reviewIsComplete;

  let incrementValue = 16.66666666666;
  let progressPercentage = 0;
  let reverseProgressPercentage = 0;

  if (projectDetailsIsComplete) {
    progressPercentage += incrementValue;
  }
  if (applicantIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }

  if (researchIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (activityIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (historyIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (reviewIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }

  progressPercentage = progressPercentage.toFixed(0);
  if (progressPercentage > 95) {
    progressPercentage = 100;
  }

  reverseProgressPercentage = 100 - progressPercentage;
  if (reverseProgressPercentage < 10) {
    reverseProgressPercentage = '0';
  }

  hasBeenUpdated = null;

  viewData = {
    projectName,
    hasBeenUpdated,
    projectDetails,
    progressPercentage,
    reverseProgressPercentage,
    projectDetailsIsComplete,
    applicantIsComplete,
    researchIsComplete,
    activityIsComplete,
    historyIsComplete,
    reviewIsComplete
  };

  return res.render('prototypes/application-v2/index', viewData);
}

// ************************************************************************
//
//       VIEW DYNAMIC
//
// ************************************************************************
function appV2tinyMCEApplicationViewGet(req, res) {
  let viewData, detailsInput, applicantInput, areaInput, currentInput, historyInput, reviewInput;

  detailsInput = req.session.detailsInput;
  applicantInput = req.session.applicantInput;
  areaInput = req.session.areaInput;
  currentInput = req.session.currentInput;
  historyInput = req.session.historyInput;
  reviewInput = req.session.reviewInput;

  viewData = {
    detailsInput,
    applicantInput,
    areaInput,
    currentInput,
    historyInput,
    reviewInput
  };
  return res.render('prototypes/application-v2/view', viewData);
}

// ************************************************************************
//
//        DETAILS
//
// ************************************************************************
function appV2DetailsGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  let detailsInput = req.session.detailsInput;
  let projectDetailsIsComplete = req.session.projectDetailsIsComplete;

  viewData = {
    projectName,
    detailsInput,
    projectDetailsIsComplete
  };

  return res.render('prototypes/application-v2/details', viewData);
}

function appV2DetailsPost(req, res) {
  const { projectName, projectSummary, isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  /*let allProjectDetails = {
    projectName,
    projectSummary,
    isComplete,
  };*/

  req.session.storedProjectName = projectName;
  req.session.detailsInput = projectSummary;
  // console.log(allProjectDetails);
  // req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Eligibility - applicant
//
// ************************************************************************
function appV2EligibilityApplicantGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  let eligibilityInput = req.session.eligibilityInput;
  let applicantIsComplete = req.session.applicantIsComplete;

  viewData = {
    projectName,
    eligibilityInput,
    applicantIsComplete
  };

  return res.render('prototypes/application-v2/eligibility-applicant', viewData);
}

function appV2EligibilityApplicantPost(req, res) {
  const { eligibilityInput, isComplete } = req.body;

  /*console.log('isComplete = ' + isComplete);
   req.session.storedProjectName = allProjectDetails.projectName;
  // console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;*/

  req.session.eligibilityInput = eligibilityInput;

  if (isComplete == 'on') {
    req.session.applicantIsComplete = true;
  } else {
    req.session.applicantIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Eligibility - research area
//
// ************************************************************************
function appV2EligibilityResearchAreaGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allProjectDetails = req.session.projectDetails;

  viewData = {
    projectName,
    allProjectDetails
  };

  return res.render('prototypes/application-v2/eligibility-research-area', viewData);
}

function appV2EligibilityResearchAreaPost(req, res) {
  const { projectSummary, isComplete } = req.body;

  let allProjectDetails = {
    projectSummary,
    isComplete
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  // console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}
// ************************************************************************
//
//        Current research activity
//
// ************************************************************************
function appV2CurrentResearchActivityGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allProjectDetails = req.session.projectDetails;

  viewData = {
    projectName,
    allProjectDetails
  };

  return res.render('prototypes/application-v2/current-research-activity', viewData);
}

function appV2CurrentResearchActivityPost(req, res) {
  const { projectSummary, isComplete } = req.body;

  let allProjectDetails = {
    projectSummary,
    isComplete
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  // console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Research history
//
// ************************************************************************
function appV2ResearchHistoryGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allProjectDetails = req.session.projectDetails;

  viewData = {
    projectName,
    allProjectDetails
  };

  return res.render('prototypes/application-v2/research-history', viewData);
}

function appV2ResearchHistoryPost(req, res) {
  const { projectSummary, isComplete } = req.body;

  let allProjectDetails = {
    projectSummary,
    isComplete
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  // console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}
// ************************************************************************
//
//        Review
//
// ************************************************************************
function appV2ReviewGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allProjectDetails = req.session.projectDetails;

  viewData = {
    projectName,
    allProjectDetails
  };

  return res.render('prototypes/application-v2/review', viewData);
}

function appV2ReviewPost(req, res) {
  const { projectSummary, isComplete } = req.body;

  let allProjectDetails = {
    projectSummary,
    isComplete
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  // console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        CASE FOR SUPPORT
//
// ************************************************************************
function appV2caseForSupportGet(req, res) {
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

  return res.render('prototypes/application-v2/case-for-support', viewData);
}

function appV2caseForSupportPost(req, res) {
  const { caseForSupportNotes, isComplete } = req.body;

  if (isComplete == 'on') {
    req.session.caseForSupportIsComplete = true;
  } else {
    req.session.caseForSupportIsComplete = null;
  }

  req.session.caseForSupportNotes = caseForSupportNotes;
  req.session.caseHasBeenUpdated = true;
  req.session.hasBeenUpdated = true;

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Add applicant
//
// ************************************************************************
function appV2AddApplicantGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  const allOrgs = generalData.allOrgs2;

  viewData = {
    projectName,
    allOrgs
  };

  return res.render('prototypes/application-v2/add-applicant', viewData);
}

function appV2AddApplicantPost(req, res) {
  const { firstName, lastName, email, organisation, role } = req.body;

  req.session.firstName = firstName;
  req.session.lastName = lastName;
  req.session.email = email;
  req.session.organisation = organisation;
  req.session.role = role;

  return res.redirect('/prototypes/application-v2/add-applicant');
}