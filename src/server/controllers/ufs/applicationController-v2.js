// suggested learning full list GET
// This is the fuller version with

import * as demosController from './createOpportunity-v3';

// const cheerio = require('cheerio');

const untitledProjectName = 'Untitled project';
let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       AHRC opportunity
//
// ************************************************************************

export function appV2AHRCOpportunityGet(req, res) {
  let viewData;
  // req.session.ahrcDemo = true;

  let clearSession = req.param('clearSession');
  if (clearSession === 'true') {
    req.session.destroy();
  }

  viewData = {};

  return res.render('prototypes/application-v2/opportunity', viewData);
}

export function appV2AHRCOpportunityPost(req, res) {
  const {} = req.body;

  return res.redirect('/prototypes/application-v2/opportunity');
}

// ************************************************************************
//
//       Application overview
//
// ************************************************************************

export function appV2tinyMCEApplicationIndexGet(req, res) {
  let viewData,
    hasBeenUpdated,
    projectDetails,
    teamHasBeenUpdated,
    capabilityHasBeenUpdated,
    resourcesHasBeenUpdated,
    projectDetailsIsComplete,
    eligibilityInputComplete,
    programmeTopicIsComplete,
    widerEffectIsComplete,
    researchExperienceIsComplete,
    writeReviewIsComplete;

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
    writeReviewIsComplete,
  };

  return res.render('prototypes/application-v2/index', viewData);
}

// ************************************************************************
//
//       VIEW DYNAMIC
//
// ************************************************************************
export function appV2tinyMCEApplicationViewGet(req, res) {
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
    writeReview,
  };
  return res.render('prototypes/application-v2/view', viewData);
}

// ************************************************************************
//
//        DETAILS
//
// ************************************************************************
export function appV2DetailsGet(req, res) {
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
    projectDetailsIsComplete,
  };

  return res.render('prototypes/application-v2/details', viewData);
}

export function appV2DetailsPost(req, res) {
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
export function appV2EligibilityApplicantGet(req, res) {
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
    applicantIsComplete,
  };

  return res.render('prototypes/application-v2/eligibility-applicant', viewData);
}

export function appV2EligibilityApplicantPost(req, res) {
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
export function appV2EligibilityResearchAreaGet(req, res) {
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
    programmeTopicIsComplete,
  };

  return res.render('prototypes/application-v2/eligibility-research-area', viewData);
}

export function appV2EligibilityResearchAreaPost(req, res) {
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
export function appV2CurrentResearchActivityGet(req, res) {
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
    widerEffectIsComplete,
  };

  return res.render('prototypes/application-v2/current-research-activity', viewData);
}

export function appV2CurrentResearchActivityPost(req, res) {
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
export function appV2ResearchHistoryGet(req, res) {
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
    researchExperienceIsComplete,
  };

  return res.render('prototypes/application-v2/research-history', viewData);
}

export function appV2ResearchHistoryPost(req, res) {
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
export function appV2ReviewGet(req, res) {
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
    writeReviewIsComplete,
  };

  return res.render('prototypes/application-v2/review', viewData);
}

export function appV2ReviewPost(req, res) {
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
export function appV2caseForSupportGet(req, res) {
  let viewData, storedCaseForSupportNotes;

  storedCaseForSupportNotes = req.session.caseForSupportNotes;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  viewData = {
    storedCaseForSupportNotes,
    projectName,
  };

  return res.render('prototypes/application-v2/case-for-support', viewData);
}

export function appV2caseForSupportPost(req, res) {
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
export function appV2AddApplicantGet(req, res) {
  let viewData;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  const allOrgs = generalData.allOrgs2;

  viewData = {
    projectName,
    allOrgs,
  };

  return res.render('prototypes/application-v2/add-applicant', viewData);
}

export function appV2AddApplicantPost(req, res) {
  const { firstName, lastName, email, organisation, role } = req.body;

  req.session.firstName = firstName;
  req.session.lastName = lastName;
  req.session.email = email;
  req.session.organisation = organisation;
  req.session.role = role;

  return res.redirect('/prototypes/application-v2/add-applicant');
}

// ************************************************************************
//
//        Prefill with data!
//
// ************************************************************************
export function appV2PopulateDataGet(req, res) {
  let viewData;

  let projectName = 'New thinkers test project name';
  req.session.storedProjectName = projectName;

  req.session.projectDetailsIsComplete = true;
  req.session.eligibilityInputComplete = true;
  req.session.programmeTopicIsComplete = true;
  req.session.widerEffectIsComplete = true;
  req.session.researchExperienceIsComplete = true;
  req.session.writeReviewIsComplete = true;

  // req.session.caseForSupportNotes = '';

  req.session.detailsInput =
    'Pellentesque molestie ante quis elit gravida euismod. Vestibulum egestas elementum sapien. Nullam scelerisque convallis odio a euismod. Vestibulum id neque ac urna aliquet pharetra. Suspendisse vel convallis turpis, pretium rutrum metus. Proin in condimentum ex. Vestibulum quis eros faucibus, ornare ligula quis, rutrum metus. Morbi accumsan sit amet nisi et interdum. Sed vulputate enim nibh, sed iaculis odio porta et. Cras blandit commodo facilisis. Cras feugiat erat arcu, at egestas purus luctus sed. Nullam molestie tempus sapien sed interdum. Nunc non dui faucibus, viverra nisl eget, ultricies ex.\n' +
    '\n' +
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate.\n' +
    '\n' +
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. ';
  req.session.eligibilityInput =
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. ';
  req.session.programmeTopic =
    'Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. ';
  req.session.widerEffect =
    'Etiam ut molestie dui. Pellentesque semper ante non massa malesuada, id dictum turpis consectetur. Fusce euismod nunc at suscipit laoreet. Morbi blandit justo est, quis accumsan justo mollis viverra. Aenean non tempus est. Sed metus nibh, facilisis suscipit porttitor sed, porttitor quis justo. Fusce placerat nunc at tincidunt gravida. Vestibulum pharetra mollis eros, nec vulputate velit. Aenean tristique elit dignissim malesuada rhoncus. Sed viverra velit quis nunc varius convallis.\n' +
    '\n' +
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. Quisque fringilla blandit venenatis. Duis consequat, purus at sodales ornare, sapien eros maximus urna, eget ultrices tellus velit vitae lorem.';
  req.session.researchExperience =
    'Etiam ut molestie dui. Pellentesque semper ante non massa malesuada, id dictum turpis consectetur. Fusce euismod nunc at suscipit laoreet. Morbi blandit justo est, quis accumsan justo mollis viverra. Aenean non tempus est. Sed metus nibh, facilisis suscipit porttitor sed, porttitor quis justo. Fusce placerat nunc at tincidunt gravida. Vestibulum pharetra mollis eros, nec vulputate velit. Aenean tristique elit dignissim malesuada rhoncus. Sed viverra velit quis nunc varius convallis.\n' +
    '\n' +
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. Quisque fringilla blandit venenatis. Duis consequat, purus at sodales ornare, sapien eros maximus urna.\n' +
    '  \n' +
    'Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. Quisque fringilla blandit venenatis. Duis consequat, purus at sodales ornare, sapien eros maximus urna.';
  req.session.writeReview =
    'Quisque malesuada efficitur viverra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nunc tincidunt est quis turpis tincidunt, quis luctus lorem ornare. Curabitur pulvinar mollis arcu. Praesent vehicula vulputate nibh sit amet lobortis. Suspendisse fringilla facilisis dui, sed sagittis lectus. Duis at eros nulla. Sed ac enim ornare, consectetur risus vel, molestie massa.\n' +
    '\n' +
    'Pellentesque molestie ante quis elit gravida euismod. Vestibulum egestas elementum sapien. Nullam scelerisque convallis odio a euismod. Vestibulum id neque ac urna aliquet pharetra. Suspendisse vel convallis turpis, pretium rutrum metus. Proin in condimentum ex. Vestibulum quis eros faucibus, ornare ligula quis, rutrum metus. Morbi accumsan sit amet nisi et interdum. Sed vulputate enim nibh, sed iaculis odio porta et. Cras blandit commodo facilisis. Cras feugiat erat arcu, at egestas purus luctus sed. Nullam molestie tempus sapien sed interdum. Nunc non dui faucibus, viverra nisl eget, ultricies ex.\n' +
    '\n' +
    'Nam hendrerit sapien eget pellentesque ultrices. Curabitur urna ante, tempor nec bibendum quis, rutrum sed arcu. Etiam nec aliquet lacus. Aenean gravida viverra leo quis blandit. Integer nunc nunc, dignissim a nibh et, lacinia ornare metus. Pellentesque elementum metus sed mauris cursus ornare. Ut venenatis massa nec risus cursus blandit. In imperdiet nisi eget diam semper, sit amet venenatis turpis faucibus. Vestibulum finibus lobortis vulputate. Quisque fringilla blandit venenatis. Duis consequat, purus at sodales ornare, sapien eros maximus urna, eget ultrices tellus velit vitae lorem.\n' +
    '\n';

  return res.render('prototypes/application-v2/populate-data', viewData);
}
