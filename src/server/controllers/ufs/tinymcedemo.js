// suggested learning full list GET
// this is the version with the 0-10 scoring as well

export function tinyMCEGet(req, res) {
  let viewData, storedPreScore, storedSpeakerNotes;
  storedPreScore = req.session.preScore;
  storedSpeakerNotes = req.session.speakerNotes;

  console.log('storedPreScore = ' + storedPreScore);
  console.log('storedSpeakerNotes = ' + storedSpeakerNotes);

  viewData = {
    storedPreScore,
    storedSpeakerNotes,
  };

  return res.render('prototypes/example-journey/introducer/index', viewData);
}

export function tinyMCEPost(req, res) {
  const { preScore, speakerNotes } = req.body;

  console.log('preScore = ' + preScore);
  console.log('speakerNotes = ' + speakerNotes);

  let storedPreScore = req.session.preScore;
  let storedSpeakerNotes = req.session.speakerNotes;

  if (parseInt(preScore) >= 0) {
    req.session.preScore = preScore;
  } else {
    req.session.preScore = storedPreScore;
  }

  if (speakerNotes) {
    req.session.speakerNotes = speakerNotes;
  } else {
    req.session.speakerNotes = storedSpeakerNotes;
  }

  return res.redirect('/prototypes/example-journey/introducer/view');
}

// view page
export function tinyMCEViewGet(req, res) {
  let viewData, preScore, speakerNotes;

  preScore = req.session.preScore;
  speakerNotes = req.session.speakerNotes;

  console.log('From view page: ' + preScore);
  console.log('From view page: ' + speakerNotes);

  viewData = { preScore, speakerNotes };
  return res.render('prototypes/example-journey/introducer/view', viewData);
}
