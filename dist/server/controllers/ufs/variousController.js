'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.autoPingGet = autoPingGet;
exports.autoPingPost = autoPingPost;
exports.megaDataGet = megaDataGet;
let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       AHRC opportunity
//
// ************************************************************************

// let refreshCounter = 0;

function autoPingGet(req, res) {
  let viewData;

  let tempRefreshCounter = req.session.refreshCounter;

  let startAgain = req.param('startAgain');
  if (startAgain === 'true') {
    req.session.refreshCounter = 0;
  }

  viewData = {
    tempRefreshCounter
  };

  return res.render('prototypes/molecules/auto-ping', viewData);
}

function autoPingPost(req, res) {
  const {} = req.body;

  let tempRefreshCounter = req.session.refreshCounter + 1;
  req.session.refreshCounter = tempRefreshCounter;
  return res.redirect('/prototypes/molecules/auto-ping');
}

// ************************************************************************
//
//       MEGA DATA TABLE
//
// ************************************************************************
function megaDataGet(req, res) {
  let viewData;

  // const allOrgs = generalData.allOrgs2;
  const megaData = generalData.megaData;

  viewData = {
    megaData
  };

  return res.render('prototypes/molecules/mega-data', viewData);
}