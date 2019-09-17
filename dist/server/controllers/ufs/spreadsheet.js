'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.spreadSheetGet = spreadSheetGet;
exports.spreadSheetPost = spreadSheetPost;
// spreadsheet

function spreadSheetGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/example-journey/application/spreadsheet', viewData);
}

function spreadSheetPost(req, res) {
  const { formSpreadsheet } = req.body;

  console.log('formSpreadsheet = ' + formSpreadsheet);

  return res.redirect('/prototypes/example-journey/application/spreadsheet');
}