let generalData = require('./data');

export function opportunityGetV2(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/opportunity-v2/index', viewData);
}

export function createOpportunityGetV2(req, res) {
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
    createOpportunityErrorMessageInputLevel,
  };
  return res.render('prototypes/opportunity-v2/create', viewData);
}

export function createOpportunityPostV2(req, res) {
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

export function opportunitySetupGetV2(req, res) {
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
    workFlowItemAdded,
  };

  return res.render('prototypes/opportunity-v2/setup', viewData);
}

export function opportunitySetupPostV2(req, res) {
  const { addWorkflowItem, submitApplication } = req.body;

  console.log('addWorkflowItem = ' + addWorkflowItem);

  if (addWorkflowItem === 'application') {
    req.session.workFlowItemAdded = true;
  }

  return res.redirect('/prototypes/opportunity-v2/setup');
}

// Funders
export function opportunityFundersGetV2(req, res) {
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
    fundersIsComplete,
  };

  return res.render('prototypes/opportunity-v2/funders', viewData);
}

export function opportunityFundersPostV2(req, res) {
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
export function opportunityApplicationGetV2(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  // fundersError = req.session.fundersError;
  req.session.fundersError = null;

  // funderslist = req.session.funderslist;

  viewData = {
    opportunityName,
    opportunityID,
  };

  return res.render('prototypes/opportunity-v2/application', viewData);
}

export function opportunityApplicationPostV2(req, res) {
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
export function opportunityApplicantsGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes, rolesList, applicantsError, applicantsIsComplete;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }
  applicantsIsComplete = req.session.applicantsIsComplete;
  rolesList = req.session.rolesList;
  applicantsError = req.session.applicantsError;
  req.session.applicantsError = null;

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
    applicantsIsComplete,
    rolesList,
    applicantsError,
  };

  return res.render('prototypes/opportunity-v2/applicants', viewData);
}

export function opportunityApplicantsPostV2(req, res) {
  const { applicantRoles, isComplete } = req.body;
  let rolesList = applicantRoles;
  let redirectURL;

  // save choices whatever
  req.session.rolesList = rolesList;

  console.log('isComplete = ' + isComplete);

  if (isComplete === 'on') {
    req.session.applicantsIsComplete = true;
    // validate here

    if (!rolesList || rolesList.length < 1) {
      console.log('no items added');
      redirectURL = '/prototypes/opportunity-v2/applicants';
    } else {
      // all good
      redirectURL = '/prototypes/opportunity-v2/workflow-application';
    }
  } else {
    // not being validated as not complete, just save and
    req.session.applicantsIsComplete = null;
    redirectURL = '/prototypes/opportunity-v2/workflow-application';
  }

  return res.redirect(redirectURL);

  /*if (rolesList) {
    return res.redirect('/prototypes/opportunity-v2/workflow-application');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/applicants');
  }*/
}

// Workflow application
export function opportunityWorkflowApplicationGetV2(req, res) {
  let viewData, opportunityName, opportunityID, workFlowItemAdded, removeItem;

  removeItem = req.param('removeItem');

  opportunityName = req.session.opportunityName;

  let applicantSectionAdded = req.session.applicantSectionAdded;
  let resourcesSectionAdded = req.session.resourcesSectionAdded;
  let customSectionAdded = req.session.customSectionAdded;

  let openingDate = req.session.openingDate;
  let openingTime = req.session.openingTime;
  let closingDate = req.session.closingDate;
  let closingTime = req.session.closingTime;
  let openingTimeMeridian = req.session.openingTimeMeridian;
  let closingTimeMeridian = req.session.closingTimeMeridian;

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

  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const openDayDate = new Date(openingDate);
  const openDay = days[openDayDate.getDay()];
  const closingDayDate = new Date(closingDate);
  const closingDay = days[closingDayDate.getDay()];

  let detailsIsComplete = req.session.detailsIsComplete;
  let applicantsIsComplete = req.session.applicantsIsComplete;

  viewData = {
    opportunityName,
    opportunityID,
    applicantSectionAdded,
    resourcesSectionAdded,
    customSectionAdded,
    openingDate,
    openingTime,
    closingDate,
    closingTime,
    openingTimeMeridian,
    closingTimeMeridian,
    openDay,
    closingDay,
    detailsIsComplete,
    applicantsIsComplete,
  };

  return res.render('prototypes/opportunity-v2/workflow-application', viewData);
}

export function opportunityWorkflowApplicationPostV2(req, res) {
  const { addNewSection, submitApplication } = req.body;

  console.log('addNewSection = ' + addNewSection);
  console.log('submitApplication = ' + submitApplication);

  if (addNewSection === 'applicants') {
    req.session.applicantSectionAdded = true;
  }

  if (addNewSection === 'resources') {
    req.session.resourcesSectionAdded = true;
  }

  if (addNewSection === 'custom') {
    req.session.customSectionAdded = true;
  }

  if (!addNewSection) {
    return res.redirect('/prototypes/opportunity-v2/setup');
  } else {
    return res.redirect('/prototypes/opportunity-v2/workflow-application');
  }
}

// Resources and costs
export function opportunityResourcesGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
  };

  return res.render('prototypes/opportunity-v2/resources-and-costs', viewData);
}

export function opportunityResourcesPostV2(req, res) {
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

// Application dates
export function opportunityApplicationsDatesGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  let openingDate = req.session.openingDate;
  let openingTime = req.session.openingTime;
  let closingDate = req.session.closingDate;
  let closingTime = req.session.closingTime;
  let openingTimeMeridian = req.session.openingTimeMeridian;
  let closingTimeMeridian = req.session.closingTimeMeridian;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
    openingDate,
    openingTime,
    closingDate,
    closingTime,
    openingTimeMeridian,
    closingTimeMeridian,
  };

  return res.render('prototypes/opportunity-v2/application-dates', viewData);
}

export function opportunityApplicationsDatesPostV2(req, res) {
  const { openingDate, openingTime, closingDate, closingTime, openingTimeMeridian, closingTimeMeridian } = req.body;

  console.log('openingDate = ' + openingDate);

  req.session.openingDate = openingDate;
  req.session.openingTime = openingTime;
  req.session.closingDate = closingDate;
  req.session.closingTime = closingTime;
  req.session.openingTimeMeridian = openingTimeMeridian;
  req.session.closingTimeMeridian = closingTimeMeridian;

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Details input page big form
export function opportunityDetailsGetV2(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  let detailsIsComplete = req.session.detailsIsComplete;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  console.log('detailsIsComplete = ' + detailsIsComplete);

  viewData = {
    opportunityName,
    opportunityID,
    detailsIsComplete,
  };

  return res.render('prototypes/opportunity-v2/details', viewData);
}

export function opportunityDetailsPostV2(req, res) {
  const { markAsComplete } = req.body;

  console.log('this is the right controller');

  console.log('details page isComplete = ' + markAsComplete);

  if (markAsComplete === 'on') {
    req.session.detailsIsComplete = true;
  } else {
    req.session.detailsIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Custom section question
export function opportunityCustomSectionGetV2(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  viewData = {
    opportunityName,
    opportunityID,
  };

  return res.render('prototypes/opportunity-v2/custom-section', viewData);
}

export function opportunityCustomSectionPostV2(req, res) {
  const { isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  if (isComplete === 'on') {
    req.session.fundersIsComplete = true;
  } else {
    req.session.fundersIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}
