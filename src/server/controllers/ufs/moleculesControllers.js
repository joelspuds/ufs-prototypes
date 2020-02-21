let generalData = require('./data');
let genericFunctions = require('./generic');

export function moleculesFiltersGet(req, res) {
  let viewData, allCouncils;

  allCouncils = generalData.allCouncils;

  viewData = {
    allCouncils,
  };
  return res.render('prototypes/molecules/filters', viewData);
}
