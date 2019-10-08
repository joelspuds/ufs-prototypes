'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.opportunityGet = opportunityGet;
exports.createOpportunityGet = createOpportunityGet;
exports.createOpportunityPost = createOpportunityPost;
exports.opportunitySetupGet = opportunitySetupGet;
exports.opportunitySetupPost = opportunitySetupPost;
exports.opportunityFundersGet = opportunityFundersGet;
exports.opportunityFundersPost = opportunityFundersPost;
// let councils = require('./data');
let generalData = require('./data');

function opportunityGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/opportunity/index', viewData);
}

function createOpportunityGet(req, res) {
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
  return res.render('prototypes/opportunity/create', viewData);
}

function createOpportunityPost(req, res) {
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

function opportunitySetupGet(req, res) {
  let viewData, opportunityName, opportunityID, fundersList;

  opportunityName = req.session.opportunityName;
  fundersList = req.session.funderslist;

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
    fundersList
  };

  return res.render('prototypes/opportunity/setup', viewData);
}

function opportunitySetupPost(req, res) {}
// return res.redirect('/prototypes/opportunity/setup');


// Funders
function opportunityFundersGet(req, res) {
  let viewData, opportunityName, opportunityID, allCouncils, funderslist;

  allCouncils = generalData.allCouncils;

  opportunityName = req.session.opportunityName;
  opportunityID = req.session.opportunityID;

  funderslist = req.session.funderslist;

  viewData = {
    opportunityName,
    opportunityID,
    allCouncils,
    funderslist
  };

  return res.render('prototypes/opportunity/funders', viewData);
}

function opportunityFundersPost(req, res) {
  const { funders } = req.body;
  console.log(funders);

  let fundersList;

  fundersList = funders;
  req.session.funderslist = fundersList;

  return res.redirect('/prototypes/opportunity/setup');
}