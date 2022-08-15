export const getDurationUnit =(duration, payType)=> {
  var durationUnit = "";
  if (payType == "Fixed") {
    if (duration > 1) {
      durationUnit = "Days";
    }
    else {
      durationUnit = "Day";
    }
  }
  else {
    if (duration > 1) {
      durationUnit = "Hours";
    }
    else {
      durationUnit = "Hour";
    }
  }

  return durationUnit;
}

export function isNumeric(str) {
  if (typeof str != "string") return false // we only process strings!
  return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
    !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

export const isValidEmail = (email) => {
  let reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  if (reg.test(email) === false) {
    return false;
  }
  return true;
};

export const kFormatter = (value) => {
  var suffixes = ["", "k", "m", "b","t"];
  var suffixNum = Math.floor((""+value).length/3);
  var shortValue = parseFloat((suffixNum != 0 ? (value / Math.pow(1000,suffixNum)) : value).toPrecision(2));
  return shortValue+suffixes[suffixNum];
}
