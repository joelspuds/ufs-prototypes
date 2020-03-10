'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerStartGetV1 = registerStartGetV1;
exports.registerStartPostV1 = registerStartPostV1;
exports.signinGetV1 = signinGetV1;
exports.signinPostV1 = signinPostV1;
exports.orgsGetV1 = orgsGetV1;
exports.orgsPostV1 = orgsPostV1;

var _index = require('./index');

var demosController = _interopRequireWildcard(_index);

var _content = require('../../config/content');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let generalData = require('./data');
let genericFunctions = require('./generic');

// check for account
function registerStartGetV1(req, res) {
  let viewData;

  /* let useAltSaveMethod = req.session.useAltSaveMethod;
  let useComplexDetailsPage = req.session.useComplexDetailsPage;
   console.log('useAltSaveMethod = ' + useAltSaveMethod);
  */
  viewData = {};

  return res.render('prototypes/register-v1/start', viewData);
}

function registerStartPostV1(req, res) {
  const { existingAccount } = req.body;

  if (existingAccount === 'yes') {
    req.session.hasExistingAccount = true;
    return res.redirect('/prototypes/register-v1/signin');
  } else {
    req.session.hasExistingAccount = false;
    return res.redirect('/prototypes/register-v1/register-start');
  }
}

// signin form
function signinGetV1(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/register-v1/signin', viewData);
}

function signinPostV1(req, res) {
  const { signinForm } = req.body;

  if (existingAccount === 'yes') {
    req.session.hasExistingAccount = true;
    return res.redirect('prototypes/register-v1/signin');
  } else {
    req.session.hasExistingAccount = false;
    return res.redirect('prototypes/register-v1/registerStart');
  }
}

// organisations selecta
function orgsGetV1(req, res) {
  let viewData;

  const allOrgs = generalData.allOrgs2;
  console.log('allOrgs = ');
  console.log(allOrgs);

  viewData = {
    allOrgs
  };

  return res.render('prototypes/register-v1/organisation', viewData);
}

function orgsPostV1(req, res) {
  const { organisation } = req.body;

  if (organisation !== '') {
    req.session.organisationName = true;
    return res.redirect('prototypes/register-v1/organisation');
  } else {
    // fail
    return res.redirect('prototypes/register-v1/organisation');
  }
}