require('isomorphic-fetch');

const baseURL = 'https://my.leviton.com/api';
const toQueryString = params => Object.keys(params)
  .map(key => `${key}=${params[key]}`)
  .join('&');

/**
 * getResidenceIotSwitches - get devices given a residenceID
 *
 * @param {string}
 * @param {string} token - user token
 */
function getResidenceIotSwitches({ residenceID, token }) {
  return fetch(`${baseURL}/Residences/${residenceID}/iotSwitches`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Access-Token': token
    }
  })
    .then((res) => res.json())
}

/**
 * getIotSwitch - get details on switch - power state, brightness etc
 *
 * @param {string} switchID
 * @param {string} token - user token
 */
function getIotSwitch({ switchID, token }) {
  return fetch(`${baseURL}/IotSwitches/${switchID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Access-Token': token
    }
  })
    .then((res) => res.json())
}

/**
 * putIotSwitch - update power or brightness state
 *
 * @param {string} switchID - switch identifier
 * @param {string} power - 'ON' or 'OFF' state
 * @param {number} brightness - integer between 1-100
 * @param {string} token - user token
 */
function putIotSwitch({ switchID, power, brightness, token }) {
  return fetch(`${baseURL}/IotSwitches/${switchID}`, {
    method: 'PUT',
    body: JSON.stringify({ power, brightness }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Access-Token': token
    }
  })
    .then((res) => res.json())
}

/**
 * getPersonResidentialPermissions - returns residenceIDs associated to personID
 *
 * @param {string} personID - userId to get accountID
 * @param {string} token - user token
 */
function getPersonResidentialPermissions({ personID, token }) {
  return fetch(`${baseURL}/Person/${personID}/residentialPermissions`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Access-Token': token
    }
  })
    .then((res) => res.json())
}

/**
 * getResidentialAccounts - get residenceIDs given accountID
 *
 * @param {string} accountID -account identifer
 * @param {string} token - user token
 */
function getResidentialAccounts({ accountID, token }) {
  return fetch(`${baseURL}/ResidentialAccounts/${accountID}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'X-Access-Token': token
    }
  })
    .then((res) => res.json())
}

/**
 * postPersonLogin - used to get user token given email/pass
 *
 * @param {string} email
 * @param {string} password
 */
function postPersonLogin({ email, password }) {
  const query = toQueryString({
    include: 'user'
  });
  return fetch(`${baseURL}/Person/login?${query}`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      loggedInVia: 'myLeviton',
      password,
      rememberMe: true,
    }),
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  })
    .then((res) => res.json())
}

module.exports = {
  getIotSwitch,
  getPersonResidentialPermissions,
  getResidenceIotSwitches,
  getResidentialAccounts,
  postPersonLogin,
  putIotSwitch,
}
