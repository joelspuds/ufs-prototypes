'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.appV2applicationTeamGet = appV2applicationTeamGet;
exports.appV2applicationTeamPost = appV2applicationTeamPost;
exports.appV2caseForSupportGet = appV2caseForSupportGet;
exports.appV2caseForSupportPost = appV2caseForSupportPost;
exports.appV2capabilityToDeliverGet = appV2capabilityToDeliverGet;
exports.appV2capabilityToDeliverPost = appV2capabilityToDeliverPost;
exports.appV2resourcesCostGet = appV2resourcesCostGet;
exports.appV2resourcesCostPost = appV2resourcesCostPost;
exports.appV2ethicalSocietalGet = appV2ethicalSocietalGet;
exports.appV2ethicalSocietalPost = appV2ethicalSocietalPost;
exports.appV2AddApplicantGet = appV2AddApplicantGet;
exports.appV2AddApplicantPost = appV2AddApplicantPost;

var _createOpportunityV = require('./createOpportunity-v3');

var demosController = _interopRequireWildcard(_createOpportunityV);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// const cheerio = require('cheerio');
let caseForSupportData = require('./case-for-support-2'); // suggested learning full list GET
// This is the fuller version with

const untitledProjectName = 'Untitled project';
let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       Application overview
//
// ************************************************************************

function appV2tinyMCEApplicationIndexGet(req, res) {
  let viewData, hasBeenUpdated, projectDetails, teamHasBeenUpdated, caseHasBeenUpdated, capabilityHasBeenUpdated, ethicalHasBeenUpdated, resourcesHasBeenUpdated, projectDetailsIsComplete, applicationDetailsIsComplete, caseForSupportIsComplete, capabilityToDeliverIsComplete, resourcesAndCostsIsComplete, ethicalAndSocietalIsComplete;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  // console.log(projectDetails);

  projectDetails = req.session.projectDetails;
  hasBeenUpdated = req.session.hasBeenUpdated;
  teamHasBeenUpdated = req.session.teamHasBeenUpdated;
  caseHasBeenUpdated = req.session.caseHasBeenUpdated;
  capabilityHasBeenUpdated = req.session.capabilityHasBeenUpdated;
  ethicalHasBeenUpdated = req.session.ethicalHasBeenUpdated;
  resourcesHasBeenUpdated = req.session.resourcesHasBeenUpdated;

  req.session.hasBeenUpdated = null;

  projectDetailsIsComplete = req.session.projectDetailsIsComplete;
  applicationDetailsIsComplete = req.session.applicationDetailsIsComplete;
  caseForSupportIsComplete = req.session.caseForSupportIsComplete;
  capabilityToDeliverIsComplete = req.session.capabilityToDeliverIsComplete;
  resourcesAndCostsIsComplete = req.session.resourcesAndCostsIsComplete;
  ethicalAndSocietalIsComplete = req.session.ethicalAndSocietalIsComplete;

  let incrementValue = 16.66666666666;
  let progressPercentage = 0;
  let reverseProgressPercentage = 0;

  if (projectDetailsIsComplete) {
    progressPercentage += incrementValue;
  }
  if (applicationDetailsIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (caseForSupportIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (capabilityToDeliverIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (ethicalAndSocietalIsComplete) {
    progressPercentage = progressPercentage + incrementValue;
  }
  if (resourcesAndCostsIsComplete) {
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
    teamHasBeenUpdated,
    caseHasBeenUpdated,
    capabilityHasBeenUpdated,
    ethicalHasBeenUpdated,
    resourcesHasBeenUpdated,
    progressPercentage,
    reverseProgressPercentage,
    projectDetailsIsComplete,
    applicationDetailsIsComplete,
    caseForSupportIsComplete,
    resourcesAndCostsIsComplete,
    ethicalAndSocietalIsComplete,
    capabilityToDeliverIsComplete
  };

  return res.render('prototypes/application-v2/index', viewData);
}

/*// ************************************************************************
//
//       Old case-for-support page
//
// ************************************************************************
export function appV2tinyMCEApplicationGet(req, res) {
  let viewData, storedSpeakerNotes;

  storedSpeakerNotes = req.session.speakerNotes;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    storedSpeakerNotes,
    projectName,
  };

  return res.render('prototypes/application-v2/start', viewData);
}

export function appV2tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;


  let storedSpeakerNotes = req.session.speakerNotes;

  if (cleanContent) {
    req.session.speakerNotes = cleanContent;
  } else {
    req.session.speakerNotes = storedSpeakerNotes;
  }

  return res.redirect('/prototypes/application-v2/view');
}*/

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

  return res.render('prototypes/application-v2/details', viewData);
}

function appV2DetailsPost(req, res) {
  const { projectName, projectSummary, isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  let allProjectDetails = {
    projectName,
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
//        Eligibility - applicant
//
// ************************************************************************
function appV2EligibilityApplicantGet(req, res) {
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

  return res.render('prototypes/application-v2/eligibility-applicant', viewData);
}

function appV2EligibilityApplicantPost(req, res) {
  const { projectName, projectSummary, isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  let allProjectDetails = {
    projectName,
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

  return res.render('prototypes/application-v2/eligibility-research-area', viewData);
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
//        Application team
//
// ************************************************************************
function appV2applicationTeamGet(req, res) {
  let viewData, allApplicationTeam, caseForSupportIsComplete;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  caseForSupportIsComplete = req.session.caseForSupportIsComplete;

  allApplicationTeam = req.session.allApplicationTeam;

  viewData = {
    projectName,
    allApplicationTeam,
    caseForSupportIsComplete
  };

  return res.render('prototypes/application-v2/application-team', viewData);
}

function appV2applicationTeamPost(req, res) {
  const { isComplete } = req.body;

  let allApplicationTeam = {
    isComplete
  };

  console.log(isComplete);

  req.session.allApplicationTeam = allApplicationTeam;

  if (isComplete == 'on') {
    req.session.applicationDetailsIsComplete = true;
  } else {
    req.session.applicationDetailsIsComplete = null;
  }

  req.session.hasBeenUpdated = true;
  req.session.teamHasBeenUpdated = true;

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
//        Capability to deliver
//
// ************************************************************************
function appV2capabilityToDeliverGet(req, res) {
  let viewData, capabilityToDeliverNotes, allCapabilityToDeliver;

  capabilityToDeliverNotes = req.session.storedCapabilityToDeliverNotes;
  allCapabilityToDeliver = req.session.allCapabilityToDeliver;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName,
    capabilityToDeliverNotes,
    allCapabilityToDeliver
  };

  return res.render('prototypes/application-v2/capability-to-deliver', viewData);
}

function appV2capabilityToDeliverPost(req, res) {
  const { capabilityToDeliverNotes, isComplete } = req.body;

  let allCapabilityToDeliver = {
    isComplete
  };

  req.session.allCapabilityToDeliver = allCapabilityToDeliver;

  if (isComplete == 'on') {
    req.session.capabilityToDeliverIsComplete = true;
  } else {
    req.session.capabilityToDeliverIsComplete = null;
  }

  req.session.storedCapabilityToDeliverNotes = capabilityToDeliverNotes;
  req.session.hasBeenUpdated = true;
  req.session.capabilityHasBeenUpdated = true;

  return res.redirect('/prototypes/application-v2/');
}
// ************************************************************************
//
//        Resources and costs
//
// ************************************************************************
function appV2resourcesCostGet(req, res) {
  let viewData, allResourcesValues;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allResourcesValues = req.session.allResourcesValues;
  console.log(allResourcesValues);

  viewData = {
    projectName,
    allResourcesValues
  };

  return res.render('prototypes/application-v2/resources-and-cost', viewData);
}

function appV2resourcesCostPost(req, res) {
  const {
    isComplete,
    fullTimeStaff,
    partTimeStaff,
    totalStaffCost,
    travelCostsText,
    totalTravelCost,
    equipmentCostsText,
    totalEquipmentCost,
    otherCostsText,
    totalOtherCost,
    indirectCostsText,
    totalIndirectCost
  } = req.body;

  if (isComplete == 'on') {
    req.session.resourcesAndCostsIsComplete = true;
  } else {
    req.session.resourcesAndCostsIsComplete = null;
  }

  /*let newCostsStaff, newCostsOverheads, newCostsMaterials;
   if (genericFunctions.isNumeric(costsStaff)) {
    newCostsStaff = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsStaff);
    allResourcesAndCosts.costsStaff = newCostsStaff;
  } else {
    allResourcesAndCosts.costsStaff = costsStaff;
  }
   if (genericFunctions.isNumeric(costsOverheads)) {
    newCostsOverheads = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsOverheads);
    allResourcesAndCosts.costsOverheads = newCostsOverheads;
  } else {
    allResourcesAndCosts.costsOverheads = costsOverheads;
  }
   if (genericFunctions.isNumeric(costsMaterials)) {
    newCostsMaterials = new Intl.NumberFormat('en-UK', { style: 'currency', currency: 'GBP' }).format(costsMaterials);
    allResourcesAndCosts.costsMaterials = newCostsMaterials;
  } else {
    allResourcesAndCosts.costsMaterials = costsMaterials;
  }
  */
  // console.log('newCostsStaff = ' + newCostsStaff);

  req.session.hasBeenUpdated = true;
  req.session.resourcesHasBeenUpdated = true;

  let allResourcesValues = {
    fullTimeStaff,
    partTimeStaff,
    totalStaffCost,
    travelCostsText,
    totalTravelCost,
    equipmentCostsText,
    totalEquipmentCost,
    otherCostsText,
    totalOtherCost,
    indirectCostsText,
    totalIndirectCost,
    isComplete
  };

  let uberTotalCost = 0;
  uberTotalCost = parseInt(allResourcesValues.totalStaffCost) + parseInt(allResourcesValues.totalTravelCost) + parseInt(allResourcesValues.totalEquipmentCost) + parseInt(allResourcesValues.totalOtherCost) + parseInt(allResourcesValues.totalIndirectCost);

  console.log(uberTotalCost);

  allResourcesValues.uberTotalCost = uberTotalCost;

  req.session.allResourcesValues = allResourcesValues;

  console.log(allResourcesValues);

  return res.redirect('/prototypes/application-v2/');
}

// ************************************************************************
//
//        ethical and societal
//
// ************************************************************************
function appV2ethicalSocietalGet(req, res) {
  let viewData, ethicalReasons, allEthicalAndSocietal;

  ethicalReasons = generalData.ethicalReasons;

  console.log(ethicalReasons);

  allEthicalAndSocietal = req.session.allEthicalAndSocietal;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    projectName,
    ethicalReasons,
    allEthicalAndSocietal
  };

  return res.render('prototypes/application-v2/ethical-and-societal-issues', viewData);
}

function appV2ethicalSocietalPost(req, res) {
  const { ethicalReasons, ethicalNotes, isComplete } = req.body;

  let allEthicalAndSocietal = {
    ethicalReasons,
    ethicalNotes,
    isComplete
  };

  if (isComplete == 'on') {
    req.session.ethicalAndSocietalIsComplete = true;
  } else {
    req.session.ethicalAndSocietalIsComplete = null;
  }

  req.session.allEthicalAndSocietal = allEthicalAndSocietal;
  req.session.ethicalReasons = ethicalReasons;
  req.session.ethicalNotes = ethicalNotes;
  req.session.hasBeenUpdated = true;
  req.session.ethicalHasBeenUpdated = true;

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