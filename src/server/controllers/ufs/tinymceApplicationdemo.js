// suggested learning full list GET
// This is the fuller version with

export function tinyMCEApplicationIndexGet(req, res) {
  let viewData;

  return res.render('prototypes/example-journey/application/index', viewData);
}

export function tinyMCEApplicationGet(req, res) {
  let viewData, storedSpeakerNotes;

  storedSpeakerNotes = req.session.speakerNotes;

  console.log('storedSpeakerNotes = ' + storedSpeakerNotes);

  viewData = {
    storedSpeakerNotes,
  };

  return res.render('prototypes/example-journey/application/start', viewData);
}

export function tinyMCEApplicationPost(req, res) {
  const { speakerNotes } = req.body;

  console.log('speakerNotes = ' + speakerNotes);

  let storedSpeakerNotes = req.session.speakerNotes;

  if (speakerNotes) {
    req.session.speakerNotes = speakerNotes;
  } else {
    req.session.speakerNotes = storedSpeakerNotes;
  }

  return res.redirect('/prototypes/example-journey/application/view');
}

// view page
export function tinyMCEApplicationViewGet(req, res) {
  let viewData, speakerNotes;

  speakerNotes = req.session.speakerNotes;

  console.log('From view page: ' + speakerNotes);

  viewData = { speakerNotes };
  return res.render('prototypes/example-journey/application/view', viewData);
}
