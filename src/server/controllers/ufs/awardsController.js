let generalData = require('./data');
let genericFunctions = require('./generic');

/* **************

    Awards home

*************** */
export function awardStartGet(req, res) {
  let viewData;

  // opportunityName = req.session.opportunityName;
  // createOpportunityError = req.session.createOpportunityError;

  const megaDataAwards = generalData.megaDataAwards;
  const allCouncils = generalData.allCouncils;

  viewData = {
    megaDataAwards,
    allCouncils,
  };
  return res.render('prototypes/awards/index', viewData);
}

export function awardStartPost(req, res) {
  const {} = req.body;

  // req.session.opportunityName = opportunityName;

  return res.redirect('/prototypes/awards/index');
}

/* **************

    Create new award

*************** */
export function createAwardGet(req, res) {
  let viewData;

  // opportunityName = req.session.opportunityName;
  // createOpportunityError = req.session.createOpportunityError;

  const megaDataAwards = generalData.megaDataAwards;
  const allCouncils = generalData.allCouncils;

  viewData = {
    megaDataAwards,
    allCouncils,
  };
  return res.render('prototypes/awards/index', viewData);
}

export function createAwardPost(req, res) {
  const {} = req.body;

  // req.session.opportunityName = opportunityName;

  return res.redirect('/prototypes/awards/index');
}
