// upload stuff
var fs = require('fs');

export function uploadStuffGet(req, res) {
  let viewData;
  viewData = {};
  return res.render('prototypes/example-journey/introducer/index', viewData);
}

export function uploadStuffPost(req, res) {}
