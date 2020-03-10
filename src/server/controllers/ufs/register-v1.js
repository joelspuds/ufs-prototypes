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
    return res.redirect('/prototypes/register-v1/register-start');
  }
}

// signin form
export function signinGetV1(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/register-v1/signin', viewData);
}

export function signinPostV1(req, res) {
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
export function orgsGetV1(req, res) {
  let viewData;

  const allOrgs = generalData.allOrgs2;
  console.log('allOrgs = ');
  console.log(allOrgs);

  viewData = {
    allOrgs,
  };

  return res.render('prototypes/register-v1/organisation', viewData);
}

export function orgsPostV1(req, res) {
  const { organisation } = req.body;

  if (organisation !== '') {
    req.session.organisationName = true;
    return res.redirect('prototypes/register-v1/organisation');
  } else {
    // fail
    return res.redirect('prototypes/register-v1/organisation');
  }
}
