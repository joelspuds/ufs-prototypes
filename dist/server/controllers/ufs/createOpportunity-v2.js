'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opportunityGetV2 = opportunityGetV2;
exports.createOpportunityGetV2 = createOpportunityGetV2;
exports.createOpportunityPostV2 = createOpportunityPostV2;
exports.opportunitySetupGetV2 = opportunitySetupGetV2;
exports.opportunitySetupPostV2 = opportunitySetupPostV2;
exports.opportunityFundersGetV2 = opportunityFundersGetV2;
exports.opportunityFundersPostV2 = opportunityFundersPostV2;
exports.opportunityApplicationGetV2 = opportunityApplicationGetV2;
exports.opportunityApplicationPostV2 = opportunityApplicationPostV2;
exports.opportunityApplicantsGetV2 = opportunityApplicantsGetV2;
exports.opportunityApplicantsPostV2 = opportunityApplicantsPostV2;
exports.opportunityWorkflowApplicationGetV2 = opportunityWorkflowApplicationGetV2;
exports.opportunityWorkflowApplicationPostV2 = opportunityWorkflowApplicationPostV2;
exports.opportunityResourcesGetV2 = opportunityResourcesGetV2;
exports.opportunityResourcesPostV2 = opportunityResourcesPostV2;
let generalData = require('./data');

function opportunityGetV2(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/opportunity-v2/index', viewData);
}

function createOpportunityGetV2(req, res) {
  let viewData, createOpportunityError, createOpportunityErrorMessage, opportunityName, createOpportunityErrorMessageInputLevel;

  opportunityName = req.session.opportunityName;

  createOpportunityError = req.session.createOpportunityError;
  createOpportunityErrorMessage = req.session.createOpportunityErrorMessage;
  createOpportunityErrorMessageInputLevel = req.session.createOpportunityErrorMessageInputLevel;
  req.session.createOpportunityError = null;
  req.session.createOpportunityErrorMessage = null;
  req.session.createOpportunityErrorMessageInputLevel = null;

  viewData = {
    createOpportunityError,
    createOpportunityErrorMessage,
    opportunityName,
    createOpportunityErrorMessageInputLevel
  };
  return res.render('prototypes/opportunity-v2/create', viewData);
}

function createOpportunityPostV2(req, res) {
  const { opportunityName } = req.body;

  req.session.opportunityName = opportunityName;

  if (opportunityName.length < 10) {
    req.session.createOpportunityError = true;
    req.session.createOpportunityErrorMessage = 'You must enter an opportunity name';
    req.session.createOpportunityErrorMessageInputLevel = 'Your opportunity name must be at least 10 characters long';
    return res.redirect('/prototypes/opportunity-v2/create');
  } else {
    return res.redirect('/prototypes/opportunity-v2/setup');
  }
}

function opportunitySetupGetV2(req, res) {
  let viewData, opportunityName, opportunityID, fundersList, fundersIsComplete, workFlowItemAdded, removeItem;

  removeItem = req.param('removeItem');

  opportunityName = req.session.opportunityName;
  fundersList = req.session.funderslist;
  fundersIsComplete = req.session.fundersIsComplete;

  if (removeItem === 'true') {
    req.session.workFlowItemAdded = null;
  }
  workFlowItemAdded = req.session.workFlowItemAdded;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  opportunityID = req.session.opportunityID;
  if (!opportunityID) {
    opportunityID = 'OPP-' + Math.floor(Math.random() * 10000) + 1;
    req.session.opportunityID = opportunityID;
  }

  viewData = {
    opportunityName,
    opportunityID,
    fundersList,
    fundersIsComplete,
    workFlowItemAdded
  };

  return res.render('prototypes/opportunity-v2/setup', viewData);
}

function opportunitySetupPostV2(req, res) {
  const { addWorkflowItem } = req.body;

  console.log('addWorkflowItem = ' + addWorkflowItem);

  if (addWorkflowItem === 'application') {
    req.session.workFlowItemAdded = true;
  }

  return res.redirect('/prototypes/opportunity-v2/setup');
}

// Funders
function opportunityFundersGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allCouncils, funderslist, fundersError, fundersIsComplete;

  allCouncils = generalData.allCouncils;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  fundersIsComplete = req.session.fundersIsComplete;

  fundersError = req.session.fundersError;
  req.session.fundersError = null;

  funderslist = req.session.funderslist;

  viewData = {
    opportunityName,
    opportunityID,
    allCouncils,
    funderslist,
    fundersError,
    fundersIsComplete
  };

  return res.render('prototypes/opportunity-v2/funders', viewData);
}

function opportunityFundersPostV2(req, res) {
  const { funders, isComplete } = req.body;
  console.log(funders);

  let fundersList, allCouncils;

  allCouncils = generalData.allCouncils;

  fundersList = funders;
  console.log(fundersList);

  console.log('isComplete = ' + isComplete);

  if (isComplete === 'on') {
    req.session.fundersIsComplete = true;
  } else {
    req.session.fundersIsComplete = null;
  }

  req.session.funderslist = fundersList;

  if (fundersList) {
    return res.redirect('/prototypes/opportunity-v2/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/funders');
  }
}

// Application
function opportunityApplicationGetV2(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  // fundersError = req.session.fundersError;
  req.session.fundersError = null;

  // funderslist = req.session.funderslist;

  viewData = {
    opportunityName,
    opportunityID
  };

  return res.render('prototypes/opportunity-v2/application', viewData);
}

function opportunityApplicationPostV2(req, res) {
  const {} = req.body;
  console.log('');

  // let ;

  if (1 > 0) {
    return res.redirect('/prototypes/opportunity-v2/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/application');
  }
}

// Applicants
function opportunityApplicantsGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes, funderslist, fundersError, fundersIsComplete;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }
  // fundersIsComplete = req.session.fundersIsComplete;

  // fundersError = req.session.fundersError;
  // req.session.fundersError = null;

  funderslist = req.session.funderslist;

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
    funderslist,
    fundersError,
    fundersIsComplete
  };

  return res.render('prototypes/opportunity-v2/applicants', viewData);
}

function opportunityApplicantsPostV2(req, res) {
  const { applicantRoles, isComplete } = req.body;
  console.log(applicantRoles);

  let rolesList, allCouncils;

  allCouncils = generalData.allCouncils;

  rolesList = applicantRoles;
  console.log(rolesList);

  // console.log('isComplete = ' + isComplete);

  if (isComplete === 'on') {
    req.session.fundersIsComplete = true;
  } else {
    req.session.fundersIsComplete = null;
  }

  req.session.rolesList = rolesList;

  if (rolesList) {
    return res.redirect('/prototypes/opportunity-v2/workflow-application');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/applicants');
  }
}

// Workflow application
function opportunityWorkflowApplicationGetV2(req, res) {
  let viewData, opportunityName, opportunityID, workFlowItemAdded, removeItem;

  removeItem = req.param('removeItem');

  opportunityName = req.session.opportunityName;

  let applicantSectionAdded = req.session.applicantSectionAdded;
  let resourcesSectionAdded = req.session.resourcesSectionAdded;
  let customSectionAdded = req.session.customSectionAdded;

  /*if (removeItem === 'true') {
    req.session.workFlowItemAdded = null;
  }*/
  workFlowItemAdded = req.session.workFlowItemAdded;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  opportunityID = req.session.opportunityID;
  if (!opportunityID) {
    opportunityID = 'OPP-' + Math.floor(Math.random() * 10000) + 1;
    req.session.opportunityID = opportunityID;
  }

  viewData = {
    opportunityName,
    opportunityID,
    applicantSectionAdded,
    resourcesSectionAdded,
    customSectionAdded
  };

  return res.render('prototypes/opportunity-v2/workflow-application', viewData);
}

function opportunityWorkflowApplicationPostV2(req, res) {
  const { addNewSection } = req.body;

  // console.log('addNewSection = ' + addNewSection);

  if (addNewSection === 'applicants') {
    req.session.applicantSectionAdded = true;
  }

  if (addNewSection === 'resources') {
    req.session.resourcesSectionAdded = true;
  }

  if (addNewSection === 'custom') {
    req.session.customSectionAdded = true;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Resources and costs
function opportunityResourcesGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes
  };

  return res.render('prototypes/opportunity-v2/resources-and-costs', viewData);
}

function opportunityResourcesPostV2(req, res) {
  const { isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  if (isComplete === 'on') {
    req.session.fundersIsComplete = true;
  } else {
    req.session.fundersIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');

  /*if (isComplete) {
    return res.redirect('/prototypes/opportunity-v2/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/resources-and-costs');
  }*/
}