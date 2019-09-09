'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploadStuffGet = uploadStuffGet;
exports.uploadStuffPost = uploadStuffPost;
// upload stuff
var fs = require('fs');

function uploadStuffGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/example-journey/introducer/index', viewData);
}

function uploadStuffPost(req, res) {}