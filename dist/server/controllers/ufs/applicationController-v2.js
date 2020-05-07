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
  req.session.ahrcDemo = true;
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
  let viewData, hasBeenUpdated, projectDetails, teamHasBeenUpdated, capabilityHasBeenUpdated, resourcesHasBeenUpdated, projectDetailsIsComplete, eligibilityInputComplete, programmeTopicIsComplete, widerEffectIsComplete, researchExperienceIsComplete, writeReviewIsComplete;

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
  eligibilityInputComplete = req.session.eligibilityInputComplete;
  programmeTopicIsComplete = req.session.programmeTopicIsComplete;
  widerEffectIsComplete = req.session.widerEffectIsComplete;
  researchExperienceIsComplete = req.session.researchExperienceIsComplete;
  writeReviewIsComplete = req.session.writeReviewIsComplete;

  /*activityIsComplete = req.session.activityIsComplete;
  historyIsComplete = req.session.historyIsComplete;
  reviewIsComplete = req.session.reviewIsComplete;*/

  let incrementValue = 16.66666666666;
  let progressPercentage = 0;
  let reverseProgressPercentage = 0;

  if (projectDetailsIsComplete) {
    progressPercentage += incrementValue;
  }
  if (eligibilityInputComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (programmeTopicIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (widerEffectIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (researchExperienceIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (writeReviewIsComplete) {
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
    eligibilityInputComplete,
    programmeTopicIsComplete,
    widerEffectIsComplete,
    researchExperienceIsComplete,
    writeReviewIsComplete
  };

  return res.render('prototypes/application-v2/index', viewData);
}

// ************************************************************************
//
//       VIEW DYNAMIC
//
// ************************************************************************
function appV2tinyMCEApplicationViewGet(req, res) {
  let viewData, detailsInput, programmeTopic, widerEffect, researchExperience, writeReview, eligibilityInput;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  detailsInput = req.session.detailsInput;
  eligibilityInput = req.session.eligibilityInput;
  programmeTopic = req.session.programmeTopic;
  widerEffect = req.session.widerEffect;
  researchExperience = req.session.researchExperience;

  writeReview = req.session.writeReview;

  viewData = {
    projectName,
    detailsInput,
    eligibilityInput,
    programmeTopic,
    widerEffect,
    researchExperience,
    writeReview
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
//        Eligibility - your situation
//
// ************************************************************************
function appV2EligibilityApplicantGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  let eligibilityInput = req.session.eligibilityInput;
  let applicantIsComplete = req.session.eligibilityInputComplete;

  viewData = {
    projectName,
    eligibilityInput,
    applicantIsComplete
  };

  return res.render('prototypes/application-v2/eligibility-applicant', viewData);
}

function appV2EligibilityApplicantPost(req, res) {
  const { eligibilityInput, isComplete } = req.body;

  req.session.eligibilityInput = eligibilityInput;

  if (isComplete == 'on') {
    req.session.eligibilityInputComplete = true;
  } else {
    req.session.eligibilityInputComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Eligibility - research area
//
// ************************************************************************
function appV2EligibilityResearchAreaGet(req, res) {
  let viewData, programmeTopic;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  let programmeTopicIsComplete = req.session.programmeTopicIsComplete;
  programmeTopic = req.session.programmeTopic;

  viewData = {
    projectName,
    programmeTopic,
    programmeTopicIsComplete
  };

  return res.render('prototypes/application-v2/eligibility-research-area', viewData);
}

function appV2EligibilityResearchAreaPost(req, res) {
  const { programmeTopic, isComplete } = req.body;

  req.session.programmeTopic = programmeTopic;
  req.session.hasBeenUpdated = true;

  console.log('programmeTopic = ' + programmeTopic);

  if (isComplete == 'on') {
    req.session.programmeTopicIsComplete = true;
  } else {
    req.session.programmeTopicIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}
// ************************************************************************
//
//        Current research activity
//        Your research and its wider effect
//
// ************************************************************************
function appV2CurrentResearchActivityGet(req, res) {
  let viewData, widerEffect, widerEffectIsComplete;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  widerEffect = req.session.widerEffect;
  widerEffectIsComplete = req.session.widerEffectIsComplete;

  viewData = {
    projectName,
    widerEffect,
    widerEffectIsComplete
  };

  return res.render('prototypes/application-v2/current-research-activity', viewData);
}

function appV2CurrentResearchActivityPost(req, res) {
  const { widerEffect, isComplete } = req.body;

  req.session.widerEffect = widerEffect;
  req.session.hasBeenUpdated = true;

  console.log('widerEffect = ' + widerEffect);

  if (isComplete == 'on') {
    req.session.widerEffectIsComplete = true;
  } else {
    req.session.widerEffectIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        Research history
//        Your research experience
//
// ************************************************************************
function appV2ResearchHistoryGet(req, res) {
  let viewData, researchExperience;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  researchExperience = req.session.researchExperience;
  let researchExperienceIsComplete = req.session.researchExperienceIsComplete;
  viewData = {
    projectName,
    researchExperience,
    researchExperienceIsComplete
  };

  return res.render('prototypes/application-v2/research-history', viewData);
}

function appV2ResearchHistoryPost(req, res) {
  const { researchExperience, isComplete } = req.body;

  req.session.researchExperience = researchExperience;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.researchExperienceIsComplete = true;
  } else {
    req.session.researchExperienceIsComplete = null;
  }

  return res.redirect('/prototypes/application-v2/');
}
// ************************************************************************
//
//        Write a review
//
// ************************************************************************
function appV2ReviewGet(req, res) {
  let viewData, writeReview;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  writeReview = req.session.writeReview;
  let writeReviewIsComplete = req.session.writeReviewIsComplete;

  viewData = {
    projectName,
    writeReview,
    writeReviewIsComplete
  };

  return res.render('prototypes/application-v2/review', viewData);
}

function appV2ReviewPost(req, res) {
  const { writeReview, isComplete } = req.body;

  req.session.writeReview = writeReview;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.writeReviewIsComplete = true;
  } else {
    req.session.writeReviewIsComplete = null;
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