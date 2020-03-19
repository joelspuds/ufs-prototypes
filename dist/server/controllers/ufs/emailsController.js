'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emailsGet = emailsGet;
exports.emailsPost = emailsPost;

var _index = require('./index');

var demosController = _interopRequireWildcard(_index);

var _content = require('../../config/content');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

let generalData = require('./data');
let genericFunctions = require('./generic');

// import * as sendGrid from '../../../../node_modules/@sendgrid/mail';
const sgMail = require('../../../../node_modules/@sendgrid/mail');
sgMail.setApiKey('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');

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

  htmlEmailContent = '<html><head>\n' + '    <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n' + '    <meta content="utf-8" http-equiv="encoding">\n' + '    <!-- This disables auto detection of phone numbers in some clients. Remove if not needed. -->\n' + '    <meta name="format-detection" content="telephone=no">\n' + '    <title>Page title</title>\n' + '</head>\n' + '<body style="font-family: Helvetica, Arial, sans-serif;font-size: 16px;margin: 0;color:#0b0c0c">\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0">\n' + '    <tr>\n' + '        <td width="100%" height="53" bgcolor="#0b0c0c">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="70" bgcolor="#0b0c0c" valign="middle">\n' + '                        <!-- This asset should be hosted by the service -->\n' + '                        <a href="https://www.gov.uk" style="text-decoration: none;"><img src="https://raw.githubusercontent.com/alphagov/email-template/master/crown-32px.gif" alt="" height="32" border="0"></a>\n' + '                    </td>\n' + '                    <td width="100%" bgcolor="#0b0c0c" valign="middle" align="left">\n' + '                        <span style="padding-left: 5px;"><a href="https://www.gov.uk" style="font-family: Helvetica, Arial, sans-serif; font-size: 28px; line-height: 1.315789474; font-weight: 700; color: #efefef; text-decoration: none;">GOV.UK</a></span></a>\n' + '                    </td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '\n' + '<table width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#FFFFFF" style="margin-bottom: 19px">\n' + '    <tr>\n' + '        <td width="100%">\n' + '            <table width="580" cellpadding="0" cellspacing="0" border="0" align="center">\n' + '                <tr>\n' + '                    <td width="75%">\n' + '                        <h1 style="font-family: Helvetica, Arial, sans-serif; font-size: 36px; line-height: 1.315789474; font-weight: 700; margin: 19px 0 38px 0;">This is your test email</h1>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 30px 0 30px 0;">Dear Person,</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">This is the first paragraph.</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">This is the second paragraph. It is longer than the first and wraps on to two lines.</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">This paragraph includes a line-break:<br/>This is the line after the line-break.</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; border-left: 10px #dee0e2 solid; padding: 14px 0 14px 14px; font-size: 19px; line-height: 1.315789474; margin: 0 0 19px 0;">\n' + '                            This is an inset paragraph used for data or callouts<br/>\n' + '                            Application reference: 123456789<br/>\n' + '                            Date received: 15 March 2015<br/>\n' + '                        </p>\n' + '                        <h2 style="font-family: Helvetica, Arial, sans-serif; font-size: 24px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Second level heading</h2>\n' + '                        <h3 style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; font-weight: 700; margin: 38px 0 19px 0;">Third level heading</h3>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a url:<a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="https://www.gov.uk/service-start-page">https://www.gov.uk/service-start-page</a></p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; line-height: 1.315789474; margin: 0 0 30px 0;">Intro before a phone number:\n' + "                            <!-- URLs have white-space: nowrap so that they don't wrap -->\n" + '                            <a style="white-space: nowrap; font-family: Helvetica, Arial, sans-serif;" href="tel:0800123456">0800 123 456</a>\n' + '                        </p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-weight: 700; font-size: 19px; line-height: 1.315789474; margin: 38px 0 38px 0;">UKRI Funding Service</p>\n' + '                        <p style="font-family: Helvetica, Arial, sans-serif; font-size: 19px; color: #6F777B; line-height: 1.315789474; margin: 0 0 30px 0;">This is for terms and conditions and other rubric that is needed.<br/>This is the line after the line-break.</p>\n' + '                    </td>\n' + '                    <td width="25%">&nbsp;</td>\n' + '                </tr>\n' + '            </table>\n' + '        </td>\n' + '    </tr>\n' + '</table>\n' + '\n' + '</body>\n' + '\n' + '</html>\n';

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