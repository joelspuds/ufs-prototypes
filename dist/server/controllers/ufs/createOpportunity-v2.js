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
exports.opportunityApplicationsDatesGetV2 = opportunityApplicationsDatesGetV2;
exports.opportunityApplicationsDatesPostV2 = opportunityApplicationsDatesPostV2;
exports.opportunityDetailsGetV2 = opportunityDetailsGetV2;
exports.opportunityDetailsPostV2 = opportunityDetailsPostV2;
exports.opportunityCustomSectionGetV2 = opportunityCustomSectionGetV2;
exports.opportunityCustomSectionPostV2 = opportunityCustomSectionPostV2;
let generalData = require('./data');
let genericFunctions = require('./generic');

function opportunityGetV2(req, res) {
  let viewData, clearSession;
  clearSession = req.param('clearSession');
  if (clearSession === 'true') {
    req.session.destroy();
  }

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

  //console.log('fundersIsComplete = ' + fundersIsComplete);
  //console.log('fundersList = ');
  //console.log(fundersList);

  if (fundersList && fundersList[0] === null) {
    // console.log('list is null');
    fundersIsComplete = null;
    fundersList = null;
  }

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

  let openingDate = req.session.openingDate;
  let openingTime = req.session.openingTime;
  let closingDate = req.session.closingDate;
  let closingTime = req.session.closingTime;
  let openingTimeMeridian = req.session.openingTimeMeridian;
  let closingTimeMeridian = req.session.closingTimeMeridian;
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const openDayDate = new Date(openingDate);
  const openDay = days[openDayDate.getDay()];
  const closingDayDate = new Date(closingDate);
  const closingDay = days[closingDayDate.getDay()];

  let setupComplete = req.session.setupComplete;

  let openingDateTidy, openingDateTidyAsString, closingDateTidy, closingDateTidyAsString;
  if (openingDate && closingDate) {
    openingDateTidy = genericFunctions.convertDate(openingDate, true);
    openingDateTidyAsString = openingDateTidy.asString;
    closingDateTidy = genericFunctions.convertDate(closingDate, true);
    closingDateTidyAsString = closingDateTidy.asString;
  }

  viewData = {
    opportunityName,
    opportunityID,
    fundersList,
    fundersIsComplete,
    workFlowItemAdded,
    openingDate,
    openingTime,
    closingDate,
    closingTime,
    openingTimeMeridian,
    closingTimeMeridian,
    openDay,
    closingDay,
    setupComplete,
    openingDateTidyAsString,
    closingDateTidyAsString
  };

  // console.log(genericFunctions.convertDate('12/1/2020', true));
  /*let demoDate1 = genericFunctions.convertDate('12/01/2020', true);
  console.log('demoDate1.asString = ' + demoDate1.asString);
  console.log('Should be: Tuesday, 1 December 2020');
  console.log('\n' + '\n' + '\n');
  let demoDate2 = genericFunctions.convertDate('12/01/2020', false);
  console.log('demoDate2.asString = ' + demoDate2.asString);
  console.log('Should be: Sunday, 12 January 2020');*/

  return res.render('prototypes/opportunity-v2/setup', viewData);
}

function opportunitySetupPostV2(req, res) {
  const { addWorkflowItem, submitApplication } = req.body;

  // console.log('addWorkflowItem = ' + addWorkflowItem);

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
  req.session.fundersIsComplete = null;

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
  // console.log(funders);

  let fundersList, allCouncils;

  allCouncils = generalData.allCouncils;

  if (Array.isArray(funders)) {
    fundersList = funders;
  } else {
    fundersList = [funders];
  }

  req.session.funderslist = fundersList;

  // console.log(fundersList);

  if (isComplete === 'on') {
    req.session.fundersIsComplete = true;

    if (fundersList && fundersList[0] !== undefined) {
      return res.redirect('/prototypes/opportunity-v2/setup');
    } else {
      req.session.fundersError = true;
      return res.redirect('/prototypes/opportunity-v2/funders');
    }
  } else {
    req.session.fundersIsComplete = null;
    return res.redirect('/prototypes/opportunity-v2/setup');
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
  // console.log('');

  if (1 > 0) {
    return res.redirect('/prototypes/opportunity-v2/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v2/application');
  }
}

// Applicants
function opportunityApplicantsGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes, rolesList, applicantsError, applicantsIsComplete, applicantsErrorMessage;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }
  applicantsIsComplete = req.session.applicantsIsComplete;
  rolesList = req.session.rolesList;
  applicantsError = req.session.applicantsError;
  applicantsErrorMessage = req.session.applicantsErrorMessage;

  req.session.applicantsErrorMessage = null;
  req.session.applicantsError = null;

  // console.log('rolesList = ');
  // console.log(rolesList);

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
    applicantsIsComplete,
    rolesList,
    applicantsError,
    applicantsErrorMessage
  };

  return res.render('prototypes/opportunity-v2/applicants', viewData);
}

function opportunityApplicantsPostV2(req, res) {
  const { applicantRoles, isComplete } = req.body;
  let rolesList = applicantRoles;
  let redirectURL, applicantError;

  // save choices whatever
  req.session.rolesList = rolesList;

  // console.log('isComplete = ' + isComplete);
  // console.log(rolesList);

  if (isComplete === 'on') {
    req.session.applicantsIsComplete = true;
    // validate here

    if (!rolesList || rolesList.length < 1) {
      // console.log('no items added');
      req.session.applicantsError = true;
      req.session.applicantsErrorMessage = 'You must add at least one role.';
      redirectURL = '/prototypes/opportunity-v2/applicants';
    } else {
      // all good
      // TODO FIX THIS BACK TO WHAT IT SHOULD BE
      redirectURL = '/prototypes/opportunity-v2/workflow-application';
      // redirectURL = '/prototypes/opportunity-v2/applicants';
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
function opportunityWorkflowApplicationGetV2(req, res) {
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

  // console.log(req.session);

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

  let openDay, closingDay, openingMonth, closingMonth;

  if (openingDate) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let splitOpenDate = openingDate.split('/');
    // console.log('splitOpenDate = ' + splitOpenDate);
    let newOpenDate = new Date(splitOpenDate[0], splitOpenDate[1], splitOpenDate[2]);
    openDay = days[newOpenDate.getDay()];
    openingMonth = months[parseInt(splitOpenDate[1] - 1)];
    const closingDayDate = new Date(closingDate);
    closingDay = days[closingDayDate.getDay()];

    // console.log('openingMonth = ' + openingMonth);
  }

  let detailsIsComplete = req.session.detailsIsComplete;
  let applicantsIsComplete = req.session.applicantsIsComplete;
  let resourcesIsComplete = req.session.resourcesIsComplete;
  let customIsComplete = req.session.customIsComplete;
  let customSectionTitle = req.session.customSectionTitle;

  let openingDateTidy, openingDateTidyAsString, closingDateTidy, closingDateTidyAsString;
  if (openingDate && closingDate) {
    openingDateTidy = genericFunctions.convertDate(openingDate, true);
    openingDateTidyAsString = openingDateTidy.asString;
    closingDateTidy = genericFunctions.convertDate(closingDate, true);
    closingDateTidyAsString = closingDateTidy.asString;
  }

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
    resourcesIsComplete,
    customIsComplete,
    customSectionTitle,
    openingMonth,
    // closingMonth,
    openingDateTidyAsString,
    closingDateTidyAsString
  };

  return res.render('prototypes/opportunity-v2/workflow-application', viewData);
}

function opportunityWorkflowApplicationPostV2(req, res) {
  const { addNewSection, submitApplication, isComplete } = req.body;

  // console.log('addNewSection = ' + addNewSection);
  // console.log('submitApplication = ' + submitApplication);

  if (addNewSection === 'applicants') {
    req.session.applicantSectionAdded = true;
  }

  if (addNewSection === 'resources') {
    req.session.resourcesSectionAdded = true;
  }

  if (addNewSection === 'custom') {
    req.session.customSectionAdded = true;
  }

  let detailsIsComplete = req.session.detailsIsComplete;
  let applicantsIsComplete = req.session.applicantsIsComplete;
  let resourcesIsComplete = req.session.resourcesIsComplete;
  let customIsComplete = req.session.customIsComplete;

  if (!addNewSection) {
    let detailsIsComplete = req.session.detailsIsComplete;
    let applicantsIsComplete = req.session.applicantsIsComplete;
    let resourcesIsComplete = req.session.resourcesIsComplete;
    let customIsComplete = req.session.customIsComplete;

    if (isComplete && detailsIsComplete && applicantsIsComplete && resourcesIsComplete && customIsComplete) {
      req.session.setupComplete = true;
      return res.redirect('/prototypes/opportunity-v2/setup');
    } else {
      return res.redirect('/prototypes/opportunity-v2/setup');
    }
  } else {
    return res.redirect('/prototypes/opportunity-v2/workflow-application');
  }
}

// Resources and costs
function opportunityResourcesGetV2(req, res) {
  let viewData, opportunityName, opportunityID, allApplicantTypes, resourcesIsComplete;

  allApplicantTypes = generalData.allApplicantTypes;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  resourcesIsComplete = req.session.resourcesIsComplete;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  viewData = {
    opportunityName,
    opportunityID,
    allApplicantTypes,
    resourcesIsComplete
  };

  return res.render('prototypes/opportunity-v2/resources-and-costs', viewData);
}

function opportunityResourcesPostV2(req, res) {
  const { isComplete } = req.body;

  if (isComplete === 'on') {
    req.session.resourcesIsComplete = true;
  } else {
    req.session.resourcesIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Application dates
function opportunityApplicationsDatesGetV2(req, res) {
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
    closingTimeMeridian
  };

  return res.render('prototypes/opportunity-v2/application-dates', viewData);
}

function opportunityApplicationsDatesPostV2(req, res) {
  const { openingDate, openingTime, closingDate, closingTime, openingTimeMeridian, closingTimeMeridian } = req.body;

  // console.log('openingDate = ' + openingDate);

  req.session.openingDate = openingDate;
  req.session.openingTime = openingTime;
  req.session.closingDate = closingDate;
  req.session.closingTime = closingTime;
  req.session.openingTimeMeridian = openingTimeMeridian;
  req.session.closingTimeMeridian = closingTimeMeridian;

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Details input page big form
function opportunityDetailsGetV2(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  let detailsIsComplete = req.session.detailsIsComplete;

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  // console.log('detailsIsComplete = ' + detailsIsComplete);

  viewData = {
    opportunityName,
    opportunityID,
    detailsIsComplete
  };

  return res.render('prototypes/opportunity-v2/details', viewData);
}

function opportunityDetailsPostV2(req, res) {
  const { markAsComplete } = req.body;

  // console.log('details page isComplete = ' + markAsComplete);

  if (markAsComplete === 'on') {
    req.session.detailsIsComplete = true;
  } else {
    req.session.detailsIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v2/workflow-application');
}

// Custom section question
function opportunityCustomSectionGetV2(req, res) {
  let viewData, opportunityName, opportunityID, sectionTitle, yourQuestion, questionGuidance, wordcount, customIsComplete;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  sectionTitle = req.session.customSectionTitle;
  yourQuestion = req.session.customYourQuestion;
  questionGuidance = req.session.customQuestionGuidance;
  wordcount = req.session.customWordcount;
  customIsComplete = req.session.customIsComplete;

  let customSectionError = req.session.customSectionError;
  let customSectionTitleError = req.session.customSectionTitleError;
  let customSectionQuestionError = req.session.customSectionQuestionError;
  let customSectionGuidanceError = req.session.customSectionGuidanceError;
  let customSectionWordcountError = req.session.customSectionWordcountError;

  req.session.customSectionError = null;
  req.session.customSectionTitleError = null;
  req.session.customSectionQuestionError = null;
  req.session.customSectionGuidanceError = null;
  req.session.customSectionWordcountError = null;

  /*req.session.customSectionTitle = null;
  req.session.customYourQuestion = null;
  req.session.customQuestionGuidance = null;
  req.session.customWordcount = null;*/

  if (!opportunityName) {
    opportunityName = 'Development of a Novel Inhibitor of Ricin';
  }

  // console.log('sectionTitle = ' + sectionTitle);
  viewData = {
    opportunityName,
    opportunityID,
    sectionTitle,
    yourQuestion,
    questionGuidance,
    wordcount,
    customIsComplete,
    customSectionError,
    customSectionTitleError,
    customSectionQuestionError,
    customSectionGuidanceError,
    customSectionWordcountError
  };

  return res.render('prototypes/opportunity-v2/custom-section', viewData);
}

function opportunityCustomSectionPostV2(req, res) {
  const { isComplete, sectionTitle, yourQuestion, questionGuidance, wordcount } = req.body;
  let redirectURL, hasAnError;

  req.session.customSectionTitle = sectionTitle;
  req.session.customYourQuestion = yourQuestion;
  req.session.customQuestionGuidance = questionGuidance;
  req.session.customWordcount = wordcount;

  // console.log(genericFunctions.isNumeric(parseInt(wordcount)));

  if (isComplete === 'on') {
    req.session.customIsComplete = true;
    // validate here
    if (sectionTitle.length > 100 || sectionTitle.length <= 0) {
      // req.session.customSectionError = true;
      req.session.customSectionTitleError = true;
      hasAnError = true;
    }
    if (yourQuestion.length > 200 || yourQuestion.length <= 0) {
      // req.session.customSectionError = true;
      hasAnError = true;
      req.session.customSectionQuestionError = true;
    }
    if (questionGuidance.length > 200 || questionGuidance.length <= 0) {
      // req.session.customSectionError = true;
      hasAnError = true;
      req.session.customSectionGuidanceError = true;
    }
    if (genericFunctions.isNumeric(parseInt(wordcount)) === false) {
      // req.session.customSectionError = true;
      hasAnError = true;
      req.session.customSectionWordcountError = true;
    }
  }

  if (hasAnError === true) {
    req.session.customSectionError = true;
    redirectURL = '/prototypes/opportunity-v2/custom-section';
  } else {
    // req.session.customIsComplete = null;
    redirectURL = '/prototypes/opportunity-v2/workflow-application';
  }
  return res.redirect(redirectURL);
}