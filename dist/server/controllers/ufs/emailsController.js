'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailsGet = emailsGet;
exports.emailsPost = emailsPost;
exports.richTextEmailGet = richTextEmailGet;
exports.richTextEmailPost = richTextEmailPost;

var _index = require('./index');

var demosController = _interopRequireWildcard(_index);

var _content = require('../../config/content');

var _constants = require('../../config/constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let generalData = require('./data');
let genericFunctions = require('./generic');

// console.log(process.env.NODE_ENV);

const sgMail = require('../../../../node_modules/@sendgrid/mail');
// if (!isDevelopment()) {
if (process.env.NODE_ENV !== 'development') {
  // console.log('not dev');
  sgMail.setApiKey(process.env.sendGridAPI);
} else {
  // console.log('probably dev');
  let variousSecretValues = require('../../../../sendGridExport');
  sgMail.setApiKey(variousSecretValues.SENDGRID_API_KEY);
}

// check for account
function emailsGet(req, res) {
  let viewData, emailSent, emailError;

  emailSent = req.session.emailSent;
  emailError = req.session.emailError;
  req.session.emailSent = null;
  req.session.emailError = null;

  viewData = {
    emailSent,
    emailError
  };

  return res.render('prototypes/emails/index', viewData);
}

function emailsPost(req, res) {
  const { emailAddress, subject } = req.body;

  let sendToEmail = emailAddress;
  let emailSubject = subject;
  let emailError = false;
  let htmlEmailContent;

  if (sendToEmail === '') {
    emailError = true;
  }

  htmlEmailContent = '<html><head>\n' + '    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n' + '    <meta content="utf-8" http-equiv="encoding">\n' + '    <meta name="format-detection" content="telephone=no">\n' + '    <title>Page title</title>\n' + '</head>\n' + '<body style="font-family: Helvetica, Arial, sans-serif;font-size: 16px;margin: 0;color:#0b0c0c">\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0">\n' + '    <tr>\n' + '        <td width="100%" height="53" bgcolor="#2E2D62">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="70" bgcolor="#2E2D62" valign="middle"><a href="https://www.ukri.org" style="text-decoration: none;"><img src="https://tfs-front-end-v3.herokuapp.com/images/ufs/UKRI_logo_email.png" alt="" height="48" border="0" style="padding: 10px 20px 10px 0;"></a></td>\n' + '                    <td width="100%" bgcolor="#2E2D62" valign="middle" align="left"><span style="padding-left: 5px;"><a href="https://www.ukri.org/" style="font-family: Helvetica, Arial, sans-serif; font-size: 28px; line-height: 1.315789474; font-weight: 100; color: #efefef; text-decoration: none;">Funding Service</a></span></td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="margin-bottom: 19px">\n' + '    <tr>\n' + '        <td width="100%">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="75%">\n' + '                        <h1 style="font-family: Helvetica, Arial, sans-serif; font-size: 36px; line-height: 1.315789474; font-weight: 700; margin: 19px 0 38px 0; color: #2E2D62">Verify your email address</h1>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Select the link below to activate your UKRI Funding Service account and start your application for [name_of_opportunity].</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;"><a href="#" style="display:block;width:120px;padding:7px 10px 8px 10px;background-color:#00703c;border-bottom:2px solid #002d18;color:white;text-decoration:none;text-align: center">Verify email</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">This paragraph includes a line-break:<br/>This is the line after the line-break.</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; border-left: 10px #dee0e2 solid; padding: 14px 0 14px 14px; font-size: 19px; line-height: 1.315789474; margin: 0 0 19px 0;">This is an inset paragraph used for data or callouts<br/>Application reference: 123456789<br/>Date received: 15 March 2015<br/></p>\n' + '                        <h2 style="font-family: Helvetica, Arial, sans-serif; font-size: 24px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Second level heading</h2>\n' + '                        <h3 style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Third level heading</h3>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a url:<a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="https://www.gov.uk/service-start-page">https://www.gov.uk/service-start-page</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a phone number:<a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="tel:0800123456">0800 123 456</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-weight: 700; font-size: 19px; line-height: 1.315789474; margin: 38px 0 38px 0;">UKRI Funding Service</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; color: #6F777B; line-height: 1.315789474; margin: 0 0 30px 0;">This is for terms and conditions and other rubric that is needed.<br/>This is the line after the line-break.</p>\n' + '                    </td>\n' + '                    <td width="25%">&nbsp;</td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '</body></html>\n';

  if (!emailSubject || emailSubject === '') {
    emailSubject = "You didn't add a subject, so this is the default one!";
  }

  const msg = {
    to: emailAddress,
    from: 'test@example.com',
    subject: emailSubject,
    // text: 'Some test plain text',
    // html: '<strong>And some test HTML text</strong>',
    html: htmlEmailContent
  };

  if (emailError === true) {
    req.session.emailError = true;
    return res.redirect('/prototypes/emails/');
  } else {
    req.session.emailSent = true;
    sgMail.send(msg);
    console.log('email sent?');
    return res.redirect('/prototypes/emails/');
  }

  return res.redirect('/prototypes/emails/');
}

/*
*
*   RICH TEXT VERSION
*
* */

// check for account
function richTextEmailGet(req, res) {
  let viewData, emailSent, emailError;

  emailSent = req.session.emailSent;
  emailError = req.session.emailError;
  req.session.emailSent = null;
  req.session.emailError = null;

  let emailContents = '                        <h1 style="font-family: Helvetica, Arial, sans-serif; font-size: 36px; line-height: 1.315789474; font-weight: 700; margin: 19px 0 38px 0; color: #2E2D62">Verify your email address</h1>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Select the link below to activate your UKRI Funding Service account and start your application for [name_of_opportunity].</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;"><a href="http://www.disney.com" style="display:block;width:120px;padding:7px 10px 8px 10px;background-color:#00703c;border-bottom:2px solid #002d18;color:white;text-decoration:none;text-align: center">Verify email</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">This paragraph includes a line-break:<br/>This is the line after the line-break.</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; border-left: 10px #dee0e2 solid; padding: 14px 0 14px 14px; font-size: 19px; line-height: 1.315789474; margin: 0 0 19px 0;">This is an inset paragraph used for data or callouts<br/>Application reference: 123456789<br/>Date received: 15 March 2015<br/></p>\n' + '                        <h2 style="font-family: Helvetica, Arial, sans-serif; font-size: 24px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Second level heading</h2>\n' + '                        <h3 style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Third level heading</h3>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a url:<a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="https://www.gov.uk/service-start-page">https://www.gov.uk/service-start-page</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a phone number:<a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="tel:0800123456">0800 123 456</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-weight: 700; font-size: 19px; line-height: 1.315789474; margin: 38px 0 38px 0;">UKRI Funding Service</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; color: #6F777B; line-height: 1.315789474; margin: 0 0 30px 0;">This is for terms and conditions and other rubric that is needed.<br/>This is the line after the line-break.</p>\n';

  viewData = {
    emailSent,
    emailError,
    emailContents
  };

  return res.render('prototypes/emails/email-rte', viewData);
}

function richTextEmailPost(req, res) {
  const { emailAddress, subject, emailEditor } = req.body;

  let sendToEmail = emailAddress;
  let emailSubject = subject;
  let emailError = false;
  let htmlEmailContent;

  if (sendToEmail === '') {
    emailError = true;
  }

  let emailTop, emailMiddle, emailBottom;

  emailMiddle = emailEditor;

  emailTop = '<html><head>\n' + '    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n' + '    <meta content="utf-8" http-equiv="encoding">\n' + '    <meta name="format-detection" content="telephone=no">\n' + '    <title>Page title</title>\n' + '</head>\n' + '<body style="font-family: Helvetica, Arial, sans-serif;font-size: 16px;margin: 0;color:#0b0c0c">\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0">\n' + '    <tr>\n' + '        <td width="100%" height="53" bgcolor="#2E2D62">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="70" bgcolor="#2E2D62" valign="middle"><a href="https://www.ukri.org" style="text-decoration: none;"><img src="https://tfs-front-end-v3.herokuapp.com/images/ufs/UKRI_logo_email.png" alt="" height="48" border="0" style="padding: 10px 20px 10px 0;"></a></td>\n' + '                    <td width="100%" bgcolor="#2E2D62" valign="middle" align="left"><span style="padding-left: 5px;"><a href="https://www.ukri.org/" style="font-family: Helvetica, Arial, sans-serif; font-size: 28px; line-height: 1.315789474; font-weight: 100; color: #efefef; text-decoration: none;">Funding Service</a></span></td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="margin-bottom: 19px">\n' + '    <tr>\n' + '        <td width="100%">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="75%">\n';

  emailBottom = '                    </td>\n' + '                    <td width="25%">&nbsp;</td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '</body></html>\n';

  htmlEmailContent = emailTop + emailMiddle + emailBottom;

  if (!emailSubject || emailSubject === '') {
    emailSubject = "You didn't add a subject, so this is the default one!";
  }

  const msg = {
    to: emailAddress,
    from: 'test@example.com',
    subject: emailSubject,
    html: htmlEmailContent
  };

  if (emailError === true) {
    req.session.emailError = true;
    // return res.redirect('/prototypes/emails/email-rte');
  } else {
    req.session.emailSent = true;
    sgMail.send(msg);
    console.log('email sent?');
    // return res.redirect('/prototypes/emails/email-rte');
  }

  return res.redirect('/prototypes/emails/email-rte');
}