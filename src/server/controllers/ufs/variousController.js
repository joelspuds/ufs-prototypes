let generalData = require('./data');
let genericFunctions = require('./generic');

// ************************************************************************
//
//       AHRC opportunity
//
// ************************************************************************

// let refreshCounter = 0;

export function autoPingGet(req, res) {
  let viewData;

  let tempRefreshCounter = req.session.refreshCounter;

  let startAgain = req.param('startAgain');
  if (startAgain === 'true') {
    req.session.refreshCounter = 0;
  }

  viewData = {
    tempRefreshCounter,
  };

  return res.render('prototypes/molecules/auto-ping', viewData);
}

export function autoPingPost(req, res) {
  const {} = req.body;

  let tempRefreshCounter = req.session.refreshCounter + 1;
  req.session.refreshCounter = tempRefreshCounter;
  return res.redirect('/prototypes/molecules/auto-ping');
}

// ************************************************************************
//
//       MEGA DATA TABLE
//
// ************************************************************************
export function megaDataGet(req, res) {
  let viewData;

  // const allOrgs = generalData.allOrgs2;
  const megaData = generalData.megaData;

  viewData = {
    megaData,
  };

  return res.render('prototypes/molecules/mega-data', viewData);
}

// ************************************************************************
//
//       RTE simple
//
// ************************************************************************

// let refreshCounter = 0;
const startingHTML = `<h2 class="govuk-heading-m">This is an awesome title</h2>
<p class="govuk-body">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
<p class="govuk-body">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
<ul class="govuk-list govuk-list--bullet">
  <li><a href="#">Lorem</a></li>
<li><a href="#">Aliquam</a></li>
<li><a href="#">Morbi</a></li>
<li><a href="#">Praesent</a></li>
<li><a href="#">Pellentesque</a></li>
</ul>
<h3 class="govuk-heading-s">Check out my last paragraph!</h3>
<p class="govuk-body">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>`;

const guidanceHTML = `<p class="govuk-body">Focusing on one aspect of your research, give a clear outline of your idea including the format your programme would take.</p>
<p class="govuk-body">Keep in mind this will be for a non-academic audience. The assessors are looking for ideas that:</p>
<ul class="govuk-list govuk-list--bullet">
<li>are based on a strong and innovative programme concept</li>
<li>will engage and excite the public</li>
<li>explain the relevance of your research and what the findings mean in an accessible way</li>
<li>demonstrate creative and original thinking with personality and flair</li>
</ul>
<p class="govuk-body">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>`;

const unformattedHTML = `<h2>This is an awesome title</h2>
<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
<ul class="">
  <li><a href="#">Lorem</a></li>
<li><a href="#">Aliquam</a></li>
<li><a href="#">Morbi</a></li>
<li><a href="#">Praesent</a></li>
<li><a href="#">Pellentesque</a></li>
</ul>
<h3>Check out my last paragraph!</h3>`;

/*
*
*     SIMPLE
*
* */

export function rteSimpleGet(req, res) {
  let viewData, userHTML, exampleHTML, convertedHTML;

  userHTML = req.session.userHTML;

  if (!userHTML) {
    // exampleHTML = startingHTML;
    exampleHTML = guidanceHTML;
  } else {
    exampleHTML = userHTML;
  }

  convertedHTML = genericFunctions.changeHTMLTags(exampleHTML);

  viewData = {
    exampleHTML,
    convertedHTML,
  };

  return res.render('prototypes/molecules/rte-simple', viewData);
}

export function rteSimplePost(req, res) {
  const { htmlTest } = req.body;

  // let userHTML = htmlTest;
  req.session.userHTML = htmlTest;
  return res.redirect('/prototypes/molecules/rte-simple');
}

/*
*
*     Style test
*
* */

export function rteSimpleTestGet(req, res) {
  let viewData, styleTestHTML, exampleHTML, convertedHTML;

  styleTestHTML = req.session.styleTestHTML;

  if (!userHTML) {
    // exampleHTML = startingHTML;
    exampleHTML = unformattedHTML;
  } else {
    exampleHTML = userHTML;
  }

  convertedHTML = genericFunctions.changeHTMLTags(exampleHTML);

  viewData = {
    exampleHTML,
    convertedHTML,
  };

  return res.render('prototypes/molecules/rte-simple-test', viewData);
}

export function rteSimpleTestPost(req, res) {
  const { htmlTest } = req.body;

  // let userHTML = htmlTest;
  req.session.styleTestHTML = htmlTest;
  return res.redirect('/prototypes/molecules/rte-simple-test');
}

/*
*
*     Complex
*
* */

export function rteComplexGet(req, res) {
  let viewData, userHTML, exampleHTML, convertedHTML;

  userHTML = req.session.userHTML;

  if (!userHTML) {
    // exampleHTML = startingHTML;
    exampleHTML = guidanceHTML;
  } else {
    exampleHTML = userHTML;
  }

  convertedHTML = genericFunctions.changeHTMLTags(exampleHTML);

  viewData = {
    exampleHTML,
    convertedHTML,
  };

  return res.render('prototypes/molecules/rte-complex', viewData);
}

export function rteComplexPost(req, res) {
  const { htmlTest } = req.body;

  // let userHTML = htmlTest;
  req.session.userHTML = htmlTest;
  return res.redirect('/prototypes/molecules/rte-complex');
}
