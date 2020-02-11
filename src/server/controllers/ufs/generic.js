// validate password format
let validatePassword = function(password) {
  var regex = /(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{8,50})$/;
  return regex.test(password);
};

module.exports.validatePassword = validatePassword;

// is it a number?
let isNumeric = function(n) {
  // Passeth I an arguement and I shall telleth thee true if thine input ist numeric
  return !isNaN(parseFloat(n)) && isFinite(n);
};

module.exports.isNumeric = isNumeric;

// is this a valid email address
let validateEmail = function(email) {
  var regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

module.exports.validateEmail = validateEmail;

// is this a postcode
let validatePostcode = function(postcode) {
  postcode = postcode.replace(/\s/g, '');
  var regex = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;
  return regex.test(postcode);
};

module.exports.validatePostcode = validatePostcode;

// turn strings into blobs to obfuscate (this is very ugly)
let obfuscationBlobs = function(stringToBlob) {
  var blobbedString = '';
  for (var i = 1; i < stringToBlob.length; i++) {
    blobbedString += '&bull;';
  }
  return blobbedString;
};

module.exports.obfuscationBlobs = obfuscationBlobs;

let createShorterTitle = function(selector, name) {
  var selector = selector;
  var name = name;
  // split selector
  var newSelector = selector.split('>');
  return newSelector[1].charAt(1).toUpperCase() + newSelector[1].slice(2).toLowerCase() + ' ' + name;
};

module.exports.createShorterTitle = createShorterTitle;

let numberWithCommas = function(x) {
  // And thus, thine number shalt need a comma inserted within its length?
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

module.exports.numberWithCommas = numberWithCommas;

let appeasePOSentenceCase = function(s) {
  // Only capitalise the first char in the first col of the RFR browse stuff because.
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase();
};

module.exports.appeasePOSentenceCase = appeasePOSentenceCase;

let convertDate = function(crapDate, isAmerican = true, separatorChar = '/') {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  let dataAsArray, newDayNumber, newDayName, newMonth, newYear, dateParts;
  dataAsArray = crapDate.split(separatorChar);
  // console.log('0 = ' + dataAsArray[0], '1 = ' + dataAsArray[1],'2 = ' + dataAsArray[2]);
  // console.log('dataAsArray = ');
  // console.log(dataAsArray);
  if (isAmerican) {
    newDayName = days[dataAsArray[1] + 1];
    newDayNumber = dataAsArray[1];
    newMonth = months[dataAsArray[0] - 1];
    newYear = dataAsArray[2];
    console.log(
      'Is American, newDayNumber = ' + newDayNumber + ' newDayName = ' + newDayName,
      '  newMonth = ' + newMonth,
      '  newYear = ' + newYear
    );
  } else {
    newDayName = days[dataAsArray[0] + 1];
    newDayNumber = dataAsArray[0];
    newMonth = months[dataAsArray[1] - 1];
    newYear = dataAsArray[2];
    console.log(
      'Is NOT American, newDayNumber = ' + newDayNumber + ' newDayName = ' + newDayName,
      '  newMonth = ' + newMonth,
      '  newYear = ' + newYear
    );
  }

  dateParts = {
    dayName: newDayName,
    dayNumber: newDayNumber,
    month: newMonth,
    year: newYear,
  };

  return dateParts;
};

module.exports.convertDate = convertDate;

/*
*   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let splitOpenDate = openingDate.split('/');
    console.log('splitOpenDate = ' + splitOpenDate);
    let newOpenDate = new Date(splitOpenDate[0], splitOpenDate[1], splitOpenDate[2]);
    openDay = days[newOpenDate.getDay()];
    openingMonth = months[parseInt(splitOpenDate[1] - 1)];
    const closingDayDate = new Date(closingDate);
    closingDay = days[closingDayDate.getDay()];
*
* */
