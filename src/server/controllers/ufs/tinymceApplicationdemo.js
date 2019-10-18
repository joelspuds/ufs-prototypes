// suggested learning full list GET
// This is the fuller version with

const cheerio = require('cheerio');
let caseForSupportData = require('./case-for-support-2');
const untitledProjectName = 'Untitled project';
let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       Application overview
//
// ************************************************************************

export function tinyMCEApplicationIndexGet(req, res) {
  let viewData,
    hasBeenUpdated,
    projectDetails,
    teamHasBeenUpdated,
    caseHasBeenUpdated,
    capabilityHasBeenUpdated,
    ethicalHasBeenUpdated,
    resourcesHasBeenUpdated,
    projectDetailsIsComplete,
    applicationDetailsIsComplete,
    caseForSupportIsComplete,
    capabilityToDeliverIsComplete,
    resourcesAndCostsIsComplete,
    ethicalAndSocietalIsComplete;

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
    capabilityToDeliverIsComplete,
  };

  return res.render('prototypes/example-journey/application/index', viewData);
}

// ************************************************************************
//
//       Old case-for-support page
//
// ************************************************************************
export function tinyMCEApplicationGet(req, res) {
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

  return res.render('prototypes/example-journey/application/start', viewData);
}

export function tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;

  let cleanContent;

  // sanitise
  let $ = cheerio.load(speakerNotes);

  $('h1, h2, h3, h4, p, span, div').each(function() {
    this.attribs = {};
    // this.style = {};
    // this.removeAttr('style');
  });

  /*$('a').each(function() {
    this.remove();
  });*/

  $('a').each(function() {
    // this.remove();
  });

  $('h1, h2').each(function() {
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
export function tinyMCEApplicationViewGet(req, res) {
  let viewData,
    notesCaseForSupport,
    notesCapability,
    notesResources,
    notesEthical,
    notesCosts,
    costsStaff,
    costsOverheads,
    costsMaterials,
    ethicalReasons,
    allResourcesValues;

  notesCaseForSupport = req.session.caseForSupportNotes;
  notesCapability = req.session.storedCapabilityToDeliverNotes;
  notesResources = req.session.notesResources;
  notesEthical = req.session.ethicalNotes;
  ethicalReasons = req.session.ethicalReasons;
  notesCosts = req.session.projectCosts;
  costsStaff = req.session.costsStaff;
  costsOverheads = req.session.costsOverheads;
  costsMaterials = req.session.costsMaterials;
  allResourcesValues = req.session.allResourcesValues;

  viewData = {
    notesCaseForSupport,
    notesCapability,
    notesResources,
    notesEthical,
    notesCosts,
    costsStaff,
    costsOverheads,
    costsMaterials,
    ethicalReasons,
    allResourcesValues,
  };
  return res.render('prototypes/example-journey/application/view', viewData);
}
// ************************************************************************
//
//        pre-populated view page VIEW STATIC
//
// ************************************************************************
export function tinyMCEApplicationStaticViewGet(req, res) {
  let viewData, caseForSupport;

  caseForSupport = caseForSupportData.caseForSupport2;

  let $ = cheerio.load(caseForSupport);

  $('p, span, div').each(function() {
    this.attribs = {};
  });

  $('h1, h2, h3, h4').each(function() {
    // var existingID = $(this).attr('id');
    // this.attribs = {
    //   'id': existingID,
    //   'style':'test',
    // };
  });

  caseForSupport = $.html();

  viewData = {
    caseForSupport,
  };

  return res.render('prototypes/example-journey/application/view-static', viewData);
}
// ************************************************************************
//
//        PROJECT DETAILS
//
// ************************************************************************
export function projectDetailsGet(req, res) {
  let viewData, allProjectDetails;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allProjectDetails = req.session.projectDetails;

  viewData = {
    projectName,
    allProjectDetails,
  };

  return res.render('prototypes/example-journey/application/project-details', viewData);
}

export function projectDetailsPost(req, res) {
  const { projectName, projectSummary, projectDuration, month, year, isComplete } = req.body;

  console.log('isComplete = ' + isComplete);

  let allProjectDetails = {
    projectName,
    projectSummary,
    projectDuration,
    month,
    year,
    isComplete,
  };

  req.session.storedProjectName = allProjectDetails.projectName;
  console.log(allProjectDetails);
  req.session.projectDetails = allProjectDetails;
  req.session.hasBeenUpdated = true;

  if (isComplete == 'on') {
    req.session.projectDetailsIsComplete = true;
  } else {
    req.session.projectDetailsIsComplete = null;
  }

  return res.redirect('/prototypes/example-journey/application/');
}
// ************************************************************************
//
//        Application team
//
// ************************************************************************
export function applicationTeamGet(req, res) {
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
    caseForSupportIsComplete,
  };

  return res.render('prototypes/example-journey/application/application-team', viewData);
}

export function applicationTeamPost(req, res) {
  const { isComplete } = req.body;

  let allApplicationTeam = {
    isComplete,
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

  return res.redirect('/prototypes/example-journey/application/');
}

// ************************************************************************
//
//        CASE FOR SUPPORT
//
// ************************************************************************
export function caseForSupportGet(req, res) {
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

  return res.render('prototypes/example-journey/application/case-for-support', viewData);
}

export function caseForSupportPost(req, res) {
  const { caseForSupportNotes, isComplete } = req.body;

  if (isComplete == 'on') {
    req.session.caseForSupportIsComplete = true;
  } else {
    req.session.caseForSupportIsComplete = null;
  }

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
export function capabilityToDeliverGet(req, res) {
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
    allCapabilityToDeliver,
  };

  return res.render('prototypes/example-journey/application/capability-to-deliver', viewData);
}

export function capabilityToDeliverPost(req, res) {
  const { capabilityToDeliverNotes, isComplete } = req.body;

  let allCapabilityToDeliver = {
    isComplete,
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

  return res.redirect('/prototypes/example-journey/application/');
}
// ************************************************************************
//
//        Resources and costs
//
// ************************************************************************
export function resourcesCostGet(req, res) {
  let viewData, allResourcesValues;

  let projectName = req.session.storedProjectName;
  if (!projectName) {
    projectName = untitledProjectName;
  }

  allResourcesValues = req.session.allResourcesValues;
  console.log(allResourcesValues);

  viewData = {
    projectName,
    allResourcesValues,
  };

  return res.render('prototypes/example-journey/application/resources-and-cost', viewData);
}

export function resourcesCostPost(req, res) {
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
    totalIndirectCost,
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
    isComplete,
  };

  let uberTotalCost = 0;
  uberTotalCost =
    parseInt(allResourcesValues.totalStaffCost) +
    parseInt(allResourcesValues.totalTravelCost) +
    parseInt(allResourcesValues.totalEquipmentCost) +
    parseInt(allResourcesValues.totalOtherCost) +
    parseInt(allResourcesValues.totalIndirectCost);

  console.log(uberTotalCost);

  allResourcesValues.uberTotalCost = uberTotalCost;

  req.session.allResourcesValues = allResourcesValues;

  console.log(allResourcesValues);

  return res.redirect('/prototypes/example-journey/application/');
}

// ************************************************************************
//
//        ethical and societal
//
// ************************************************************************
export function ethicalSocietalGet(req, res) {
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
    allEthicalAndSocietal,
  };

  return res.render('prototypes/example-journey/application/ethical-and-societal-issues', viewData);
}

export function ethicalSocietalPost(req, res) {
  const { ethicalReasons, ethicalNotes, isComplete } = req.body;

  let allEthicalAndSocietal = {
    ethicalReasons,
    ethicalNotes,
    isComplete,
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

  return res.redirect('/prototypes/example-journey/application/');
}
