import * as demosController from './index';
import { content } from '../../config/content';

let generalData = require('./data');
let genericFunctions = require('./generic');

// check for account
export function registerStartGetV1(req, res) {
  let viewData;

  /* let useAltSaveMethod = req.session.useAltSaveMethod;
  let useComplexDetailsPage = req.session.useComplexDetailsPage;

  console.log('useAltSaveMethod = ' + useAltSaveMethod);
*/
  viewData = {};

  return res.render('prototypes/register-v1/start', viewData);
}

export function registerStartPostV1(req, res) {
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
export function signinGetV1(req, res) {
  let viewData;

  let signinError = req.session.signinError;
  let savedEmail = req.session.savedEmail;
  req.session.savedEmail = null;
  req.session.signinError = null;

  let confirmedEmail = req.param('confirmedEmail');
  if (confirmedEmail === 'true') {
    req.session.confirmedEmail = true;
  }

  viewData = {
    confirmedEmail,
    signinError,
    savedEmail,
  };

  return res.render('prototypes/register-v1/signin', viewData);
}

export function signinPostV1(req, res) {
  const { email, password } = req.body;

  req.session.savedEmail = email;

  let confirmedEmail = req.session.confirmedEmail;

  if (!email || email.length < 1 || !password || password.length < 1) {
    req.session.signinError = true;
    return res.redirect('/prototypes/register-v1/signin');
  } else {
    if (confirmedEmail === true) {
      return res.redirect('/prototypes/application-v2/');
    } else {
      /*return res.redirect('/prototypes/register-v1/signedin');*/
      return res.redirect('/prototypes/application-v2/');
    }
  }
}

// organisations selecta
export function orgsGetV1(req, res) {
  let viewData;

  const allOrgs = generalData.allOrgs2;

  let organisationNameError = req.session.organisationNameError;
  req.session.organisationNameError = null;

  viewData = {
    allOrgs,
    organisationNameError,
  };

  return res.render('prototypes/register-v1/organisation', viewData);
}

export function orgsPostV1(req, res) {
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
export function orgsConfirmGetV1(req, res) {
  let viewData, organisationName;

  organisationName = req.session.organisationName;

  viewData = {
    organisationName,
  };

  return res.render('prototypes/register-v1/confirm-organisation', viewData);
}

export function orgsConfirmPostV1(req, res) {
  const {} = req.body;
  return res.redirect('/prototypes/register-v1/details');
}

// details
export function detailsGetV1(req, res) {
  let viewData, firstName, lastName, emailAddress, firstNameError, lastNameError, emailError, passwordError, isDetailsError;

  firstNameError = req.session.firstNameError;
  lastNameError = req.session.lastNameError;
  emailError = req.session.emailError;
  passwordError = req.session.passwordError;
  firstName = req.session.firstName;
  lastName = req.session.lastName;
  emailAddress = req.session.emailAddress;
  isDetailsError = req.session.isDetailsError;

  req.session.isDetailsError = null;
  req.session.firstNameError = null;
  req.session.lastNameError = null;
  req.session.emailError = null;
  req.session.passwordError = null;

  // console.log(genericFunctions.validatePassword('Password1'));

  viewData = {
    firstNameError,
    lastNameError,
    emailError,
    passwordError,
    firstName,
    lastName,
    emailAddress,
    isDetailsError,
  };

  return res.render('prototypes/register-v1/details', viewData);
}

export function detailsPostV1(req, res) {
  const { firstName, lastName, emailAddress, password } = req.body;

  console.log(firstName, lastName, emailAddress, password);

  let isError = false;

  req.session.firstName = firstName;
  req.session.lastName = lastName;
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

  if (!genericFunctions.validateEmail(emailAddress)) {
    req.session.emailError = true;
    isError = true;
  }

  // if (!genericFunctions.validatePassword(password)) {
  if (password.length < 12) {
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

// details
export function endGetV1(req, res) {
  let viewData, emailAddress;

  emailAddress = req.session.emailAddress;

  viewData = {
    emailAddress,
    // opportunityName: ''
  };

  return res.render('prototypes/register-v1/end', viewData);
}
