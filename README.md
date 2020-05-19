# leviton-js

## Overview

A simple API wrapper for using Leviton Decora Smart Wifi switches and outlets. Tested using models:

- DW1KD
- DW15P
- DW6HD
- DW3HL

## Installation

`yarn add` or `npm install`

## Usage

Get access token and person ID:

```
postPersonLogin({
  email: 'your@email.com',
  password: 'supersecretpassword'
})
  .then(console.log)
```

Get user permissions and account ID

```
getPersonResidentialPermissions({
  personID: 'asdfasdf-asdfasd-asdfasdf-asdf,
  token: 'asdf1234'
})
  .then(console.log)
```

Get primary residence ID

```
getResidentialAccounts({
  accountID: '45674567',
  token: 'asdf1234'
})
  .then(console.log)
```

Get list of switches + switch IDs

```
getResidenceIotSwitches({
  residenceID: '123456',
  token: 'asdf1234'
})
  .then(console.log)
```

Get information on a given switch

```
getIotSwitch({
  switchID: '654332',
  token: 'asdf1234'
})
  .then(console.log)
```

Update a switch power or brightness state

```
putIotSwitch({
  switchID: '654321',
  power: 'ON',
  brightness: '100',
  token: 'asdf1234'
})
  .then(console.log)
```

Look at test.js for a complete working example integration test
