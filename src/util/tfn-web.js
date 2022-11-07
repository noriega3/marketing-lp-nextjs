function getQueryVariable(variable) {
  const query = window.location.search.substring(1);
  const vars = query.split("&");

  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split("=");
    if (pair[0] === variable) {
      return pair[1];
    }
  }

  return false;
}

export const formatPhone = (phoneNumber, parenthesis = false, defaultValue = '') => {
  const cleaned = ("" + phoneNumber).replace(/\D/g, "");
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);

  if (match) {
    if (parenthesis) {
      return "(" + match[1] + ") " + match[2] + "-" + match[3];
    } else {
      return '1-' + match[1] + "-" + match[2] + "-" + match[3];
    }
  }

  return defaultValue;
}

export const getTFNWeb = (defaultTFN) => {
  if (typeof window === 'undefined') { return defaultTFN; }
  let tfnLocalStorage = localStorage.getItem("tfn");
  let tfn = tfnLocalStorage && tfnLocalStorage !== '' ? tfnLocalStorage : getCookie('tfn');
  if (!testTFN(tfn)) {
    console.info('Invalid TFN c or ls stored, using q TFN');
    // try query param
    tfn = getQueryVariable("tfn");
    if (!testTFN(tfn)) {
      console.info('Invalid q TFN, using default TFN');
      tfn = defaultTFN;
    }
  }
  return tfn
}

const testTFN = (tfn) => tfn && RegExp("^[0-9]{10}$", "g").test(tfn)

export const getCookie = (cname) => {
  const name = cname + "=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

const exportedFunctions = {
  getTFNWeb
}

export default exportedFunctions;