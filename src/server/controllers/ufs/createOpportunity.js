// let councils = require('./data');
let generalData = require('./data');

export function opportunityGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/opportunity/index', viewData);
}

export function createOpportunityGet(req, res) {
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
  return res.render('prototypes/opportunity/create', viewData);
}

export function createOpportunityPost(req, res) {
  const { opportunityName } = req.body;

  req.session.opportunityName = opportunityName;

  if (opportunityName.length < 10) {
    req.session.createOpportunityError = true;
    req.session.createOpportunityErrorMessage = 'You must enter an opportunity name';
    req.session.createOpportunityErrorMessageInputLevel = 'Your opportunity name must be at least 10 characters long';
    return res.redirect('/prototypes/opportunity/create');
  } else {
    return res.redirect('/prototypes/opportunity/setup');
  }
}

export function opportunitySetupGet(req, res) {
  let viewData, opportunityName, opportunityID, fundersList, fundersIsComplete;

  opportunityName = req.session.opportunityName;
  fundersList = req.session.funderslist;
  fundersIsComplete = req.session.fundersIsComplete;

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
  };

  return res.render('prototypes/opportunity/setup', viewData);
}

export function opportunitySetupPost(req, res) {
  // return res.redirect('/prototypes/opportunity/setup');
}

// Funders
export function opportunityFundersGet(req, res) {
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

  return res.render('prototypes/opportunity/funders', viewData);
}

export function opportunityFundersPost(req, res) {
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
    return res.redirect('/prototypes/opportunity/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity/funders');
  }
}

// Application
export function opportunityApplicationGet(req, res) {
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

  return res.render('prototypes/opportunity/application', viewData);
}

export function opportunityApplicationPost(req, res) {
  const {} = req.body;
  console.log('');

  // let ;

  if (1 > 0) {
    return res.redirect('/prototypes/opportunity/setup');
  } else {
    req.session.fundersError = true;
    return res.redirect('/prototypes/opportunity/application');
  }
}
