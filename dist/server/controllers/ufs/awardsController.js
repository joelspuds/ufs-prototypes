'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.awardStartGet = awardStartGet;
exports.awardStartPost = awardStartPost;
exports.createAwardGet = createAwardGet;
exports.createAwardPost = createAwardPost;
let generalData = require('./data');
let genericFunctions = require('./generic');

/* **************

    Awards home

*************** */
function awardStartGet(req, res) {
  let viewData;

  // opportunityName = req.session.opportunityName;
  // createOpportunityError = req.session.createOpportunityError;

  const megaDataAwards = generalData.megaDataAwards;
  const allCouncils = generalData.allCouncils;

  viewData = {
    megaDataAwards,
    allCouncils
  };
  return res.render('prototypes/awards/index', viewData);
}

function awardStartPost(req, res) {
  const {} = req.body;

  // req.session.opportunityName = opportunityName;

  return res.redirect('/prototypes/awards/index');
}

/* **************

    Create new award

*************** */
function createAwardGet(req, res) {
  let viewData;

  // opportunityName = req.session.opportunityName;
  // createOpportunityError = req.session.createOpportunityError;

  const megaDataAwards = generalData.megaDataAwards;
  const allCouncils = generalData.allCouncils;

  viewData = {
    megaDataAwards,
    allCouncils
  };
  return res.render('prototypes/awards/index', viewData);
}

function createAwardPost(req, res) {
  const {} = req.body;

  // req.session.opportunityName = opportunityName;

  return res.redirect('/prototypes/awards/index');
}