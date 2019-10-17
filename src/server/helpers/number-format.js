const formatAsNumber = (exports.formatAsNumber = number => {
  let isNumeric = function(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  };

  let numberFormat = function(value) {
    let newNumberAsString;

    /*if (value == null || typeof value !== 'number') {
      value = 0;
    }*/

    // newNumberAsString = value.toFixed(0).toString();
    newNumberAsString = value.toString();

    newNumberAsString = newNumberAsString.replace(/\./g, ',');
    newNumberAsString = newNumberAsString.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return newNumberAsString;
  };

  if (!isNumeric(number)) {
    return number;
  } else {
    return numberFormat(number);
  }
});
