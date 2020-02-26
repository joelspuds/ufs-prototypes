'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.moleculesFiltersGet = moleculesFiltersGet;
let generalData = require('./data');
let genericFunctions = require('./generic');

function moleculesFiltersGet(req, res) {
  let viewData, allCouncils;

  allCouncils = generalData.allCouncils;

  viewData = {
    allCouncils
  };
  return res.render('prototypes/molecules/filters', viewData);
}