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
exports.orgsConfirmGetV1 = orgsConfirmGetV1;
exports.orgsConfirmPostV1 = orgsConfirmPostV1;
exports.detailsGetV1 = detailsGetV1;
exports.detailsPostV1 = detailsPostV1;

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
    return res.redirect('/prototypes/register-v1/organisation');
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
  // console.log('allOrgs = ');
  // console.log(allOrgs);

  viewData = {
    allOrgs
  };

  return res.render('prototypes/register-v1/organisation', viewData);
}

function orgsPostV1(req, res) {
  const { organisation } = req.body;
  console.log(organisation);

  if (!organisation || organisation === 'Select your organisation') {
    req.session.organisationNameError = true;
    return res.redirect('/prototypes/register-v1/organisation');
  } else {
    // cool
    req.session.organisationName = organisation;
    res.redirect('/prototypes/register-v1/confirm-organisation');
  }
}

// organisations confirma
function orgsConfirmGetV1(req, res) {
  let viewData, organisationName;

  organisationName = req.session.organisationName;

  viewData = {
    organisationName
  };

  return res.render('prototypes/register-v1/confirm-organisation', viewData);
}

function orgsConfirmPostV1(req, res) {
  const {} = req.body;
  return res.redirect('/prototypes/register-v1/details');
}

// details
function detailsGetV1(req, res) {
  let viewData, firstName, lastName, emailAddress, firstNameError, lastNameError, emailError, passwordError, isDetailsError;

  firstNameError = req.session.firstNameError;
  lastNameError = req.session.lastNameError;
  emailError = req.session.emailError;
  passwordError = req.session.passwordError;
  firstName = req.session.firstName;
  lastName = req.session.lastName;
  emailAddress = req.session.emailAddress;
  isDetailsError = req.session.isDetailsError;

  viewData = {
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    firstName,
    lastName,
    emailAddress,
    isDetailsError
  };

  return res.render('prototypes/register-v1/details', viewData);
}

function detailsPostV1(req, res) {
  const { firstName, lastName, emailAddress, password } = req.body;

  console.log(firstName, lastName, emailAddress, password);

  let isError = false;

  req.session.firstName = firstName;
  req.session.lastName = firstName;
  req.session.emailAddress = emailAddress;
  req.session.password = password;

  if (!genericFunctions.validateWord(firstName)) {
    req.session.firstNameError = true;
    isError = true;
  }

  if (!genericFunctions.validateWord(lastName)) {
    req.session.lastNameError = true;
    isError = true;
  }

  if (genericFunctions.validateEmail(password)) {
    req.session.emailError = true;
    isError = true;
  }

  if (!genericFunctions.validatePassword(password)) {
    req.session.passwordError = true;
    isError = true;
  }

  if (isError === true) {
    req.session.isDetailsError = true;
    return res.redirect('/prototypes/register-v1/details');
  } else {
    return res.redirect('/prototypes/register-v1/end');
  }
}