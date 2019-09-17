// spreadsheet

export function spreadSheetGet(req, res) {
  let viewData;

  viewData = {};

  return res.render('prototypes/example-journey/application/spreadsheet', viewData);
}

export function spreadSheetPost(req, res) {
  const { formSpreadsheet } = req.body;

  console.log('formSpreadsheet = ' + formSpreadsheet);

  return res.redirect('/prototypes/example-journey/application/spreadsheet');
}
