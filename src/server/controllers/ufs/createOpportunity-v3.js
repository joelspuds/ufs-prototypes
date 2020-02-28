import * as demosController from './index';
import { content } from '../../config/content';

let generalData = require('./data');
let genericFunctions = require('./generic');

// journey config
export function createOpportunityConfigGetV3(req, res) {
  let viewData;

  let useAltSaveMethod = req.session.useAltSaveMethod;
  let useComplexDetailsPage = req.session.useComplexDetailsPage;

  console.log('useAltSaveMethod = ' + useAltSaveMethod);

  viewData = {
    useAltSaveMethod,
    useComplexDetailsPage,
  };

  return res.render('prototypes/opportunity-v3/config', viewData);
}

export function createOpportunityConfigPostV3(req, res) {
  const { completeConfig, detailsPage } = req.body;

  // req.session.useComplexDetailsPage = detailsPage === 'complexDetailsPage';

  if (detailsPage === 'complexDetailsPage') {
    req.session.useComplexDetailsPage = true;
  } else {
    req.session.useComplexDetailsPage = false;
  }

  // req.session.useAltSaveMethod = completeConfig === 'newSaveMethod';
  // req.session.useAltSaveMethod = completeConfig === 'newSaveMethod' ? req.session.useAltSaveMethod : false;

  if (completeConfig === 'newSaveMethod') {
    req.session.useAltSaveMethod = true;
  } else {
    req.session.useAltSaveMethod = false;
  }

  return res.redirect('/prototypes/opportunity-v3/config');
}

export function opportunityGetV3(req, res) {
  let viewData, clearSession;
  clearSession = req.param('clearSession');
  if (clearSession === 'true') {
    req.session.destroy();
  }

  let allCouncils = generalData.allCouncils;

  viewData = {
    allCouncils,
  };
  return res.render('prototypes/opportunity-v3/index', viewData);
}

export function createOpportunityGetV3(req, res) {
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
  return res.render('prototypes/opportunity-v3/create', viewData);
}

export function createOpportunityPostV3(req, res) {
  const { opportunityName } = req.body;

  req.session.opportunityName = opportunityName;

  if (opportunityName.length < 10) {
    req.session.createOpportunityError = true;
    req.session.createOpportunityErrorMessage = 'You must enter an opportunity name';
    req.session.createOpportunityErrorMessageInputLevel = 'Your opportunity name must be at least 10 characters long';
    return res.redirect('/prototypes/opportunity-v3/create');
  } else {
    return res.redirect('/prototypes/opportunity-v3/setup');
  }
}

export function opportunitySetupGetV3(req, res) {
  let viewData, opportunityName, opportunityID, fundersList, fundersIsComplete, workFlowItemAdded, removeItem;

  removeItem = req.param('removeItem');

  opportunityName = req.session.opportunityName;
  fundersList = req.session.funderslist;
  fundersIsComplete = req.session.fundersIsComplete;

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
    closingDateTidyAsString,
  };

  return res.render('prototypes/opportunity-v3/setup', viewData);
}

export function opportunitySetupPostV3(req, res) {
  const { addWorkflowItem, submitApplication } = req.body;

  // console.log('addWorkflowItem = ' + addWorkflowItem);

  let setupComplete = req.session.setupComplete;

  if (addWorkflowItem === 'application') {
    req.session.workFlowItemAdded = true;
  }

  if (setupComplete === true) {
    return res.redirect('/prototypes/opportunity-v3/setup-complete');
  } else {
    return res.redirect('/prototypes/opportunity-v3/setup');
  }
}

// Funders
export function opportunityFundersGetV3(req, res) {
  let viewData, opportunityName, opportunityID, allCouncils, funderslist, fundersError, fundersIsComplete;

  allCouncils = generalData.allCouncils;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;
  fundersIsComplete = req.session.fundersIsComplete;
  req.session.fundersIsComplete = null;

  let fundersOther = req.session.fundersOther;
  let otherFundingBody = req.session.otherFundingBody;

  fundersError = req.session.fundersError;
  req.session.fundersError = null;

  funderslist = req.session.funderslist;

  // TODO this is merely in for testing!
  // req.session.useAltSaveMethod = true;
  let useAltSaveMethod = req.session.useAltSaveMethod;

  viewData = {
    fundersOther,
    otherFundingBody,
    opportunityName,
    opportunityID,
    allCouncils,
    funderslist,
    fundersError,
    fundersIsComplete,
    useAltSaveMethod,
  };

  return res.render('prototypes/opportunity-v3/funders', viewData);
}

export function opportunityFundersPostV3(req, res) {
  const { funders, isComplete, fundersOther, otherFundingBody } = req.body;

  let isCompleteSwitch = isComplete;
  // console.log(funders);
  // console.log(req.body);

  let fundersList, allCouncils;

  allCouncils = generalData.allCouncils;

  if (Array.isArray(funders)) {
    fundersList = funders;
  } else {
    fundersList = [funders];
  }

  req.session.fundersOther = fundersOther;
  req.session.otherFundingBody = otherFundingBody;
  req.session.funderslist = fundersList;

  // TODO testing button name capture
  // saveAndComplete
  // saveAsDraft
  // console.log(manageFunders);
  let submitButtonValue = req.body.submitButtonPair;
  console.log('submitButtonValue = ' + submitButtonValue);
  // return res.redirect('/prototypes/opportunity-v3/funders');

  /*let useAltSaveMethod = req.session.useAltSaveMethod;
  if (submitButtonValue === 'saveAndComplete' && useAltSaveMethod === true ) {
    isCompleteSwitch = 'on';
  } else {
    isCompleteSwitch = null;
  }*/

  if (otherFundingBody) {
    fundersList.push(otherFundingBody);
  }

  if (isCompleteSwitch === 'on') {
    req.session.fundersIsComplete = true;

    if (fundersList && fundersList[0] !== undefined) {
      return res.redirect('/prototypes/opportunity-v3/setup');
    } else {
      req.session.fundersError = true;
      return res.redirect('/prototypes/opportunity-v3/funders');
    }
  } else {
    req.session.fundersIsComplete = null;
    return res.redirect('/prototypes/opportunity-v3/setup');
  }
}

// Application
export function opportunityApplicationGetV3(req, res) {
  let viewData, opportunityName, opportunityID;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  // fundersError = req.session.fundersError;
  req.session.fundersError = null;

  viewData = {
    opportunityName,
    opportunityID,
  };

  return res.render('prototypes/opportunity-v3/application', viewData);
}

export function opportunityApplicationPostV3(req, res) {
  const {} = req.body;
  // console.log('');

  if (1 > 0) {
    return res.redirect('/prototypes/opportunity-v3/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v3/application');
  }
}

// Applicants
export function opportunityApplicantsGetV3(req, res) {
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
    applicantsErrorMessage,
  };

  return res.render('prototypes/opportunity-v3/applicants', viewData);
}

export function opportunityApplicantsPostV3(req, res) {
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
      redirectURL = '/prototypes/opportunity-v3/applicants';
    } else {
      // all good
      // TODO FIX THIS BACK TO WHAT IT SHOULD BE
      redirectURL = '/prototypes/opportunity-v3/workflow-application';
      // redirectURL = '/prototypes/opportunity-v3/applicants';
    }
  } else {
    // not being validated as not complete, just save and
    req.session.applicantsIsComplete = null;

    redirectURL = '/prototypes/opportunity-v3/workflow-application';
  }

  return res.redirect(redirectURL);

  /*if (rolesList) {
    return res.redirect('/prototypes/opportunity-v3/workflow-application');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity-v3/applicants');
  }*/
}

// Workflow application
export function opportunityWorkflowApplicationGetV3(req, res) {
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
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
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
    closingDateTidyAsString,
  };

  return res.render('prototypes/opportunity-v3/workflow-application', viewData);
}

export function opportunityWorkflowApplicationPostV3(req, res) {
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
      return res.redirect('/prototypes/opportunity-v3/setup');
    } else {
      return res.redirect('/prototypes/opportunity-v3/setup');
    }
  } else {
    return res.redirect('/prototypes/opportunity-v3/workflow-application');
  }
}

// Resources and costs
export function opportunityResourcesGetV3(req, res) {
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
    resourcesIsComplete,
  };

  return res.render('prototypes/opportunity-v3/resources-and-costs', viewData);
}

export function opportunityResourcesPostV3(req, res) {
  const { isComplete } = req.body;

  if (isComplete === 'on') {
    req.session.resourcesIsComplete = true;
  } else {
    req.session.resourcesIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v3/workflow-application');
}

// Application dates
export function opportunityApplicationsDatesGetV3(req, res) {
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

  return res.render('prototypes/opportunity-v3/application-dates', viewData);
}

export function opportunityApplicationsDatesPostV3(req, res) {
  const { openingDate, openingTime, closingDate, closingTime, openingTimeMeridian, closingTimeMeridian } = req.body;

  // console.log('openingDate = ' + openingDate);

  req.session.openingDate = openingDate;
  req.session.openingTime = openingTime;
  req.session.closingDate = closingDate;
  req.session.closingTime = closingTime;
  req.session.openingTimeMeridian = openingTimeMeridian;
  req.session.closingTimeMeridian = closingTimeMeridian;

  return res.redirect('/prototypes/opportunity-v3/workflow-application');
}

// Details input page big form
export function opportunityDetailsGetV3(req, res) {
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
    detailsIsComplete,
  };

  return res.render('prototypes/opportunity-v3/details', viewData);
}

export function opportunityDetailsPostV3(req, res) {
  const { markAsComplete } = req.body;

  // console.log('details page isComplete = ' + markAsComplete);

  if (markAsComplete === 'on') {
    req.session.detailsIsComplete = true;
  } else {
    req.session.detailsIsComplete = null;
  }

  return res.redirect('/prototypes/opportunity-v3/workflow-application');
}

// Custom section question
export function opportunityCustomSectionGetV3(req, res) {
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
    customSectionWordcountError,
  };

  return res.render('prototypes/opportunity-v3/custom-section', viewData);
}

export function opportunityCustomSectionPostV3(req, res) {
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
    redirectURL = '/prototypes/opportunity-v3/custom-section';
  } else {
    // req.session.customIsComplete = null;
    redirectURL = '/prototypes/opportunity-v3/workflow-application';
  }
  return res.redirect(redirectURL);
}

// Setup complete!
export function opportunitySetupCompleteGetV3(req, res) {
  let viewData, opportunityName, opportunityID, fundersList, fundersIsComplete, workFlowItemAdded, removeItem;

  removeItem = req.param('removeItem');

  opportunityName = req.session.opportunityName;
  fundersList = req.session.funderslist;
  fundersIsComplete = req.session.fundersIsComplete;

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
    closingDateTidyAsString,
  };

  return res.render('prototypes/opportunity-v3/setup-complete', viewData);
}

export function opportunitySetupCompletePostV3(req, res) {
  const { addWorkflowItem, submitApplication } = req.body;

  // console.log('addWorkflowItem = ' + addWorkflowItem);

  let setupComplete = req.session.setupComplete;

  if (addWorkflowItem === 'application') {
    req.session.workFlowItemAdded = true;
  }

  if (setupComplete === true) {
    return res.redirect('/prototypes/opportunity-v3/setup-complete');
  } else {
    return res.redirect('/prototypes/opportunity-v3/setup');
  }
}
