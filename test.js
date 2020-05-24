const api = require('./index');
const inquirer = require('inquirer');
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(async () => {
  try {
    // get email/pass from command line
    const { email, password } = await inquirer.prompt([{
      type: 'input',
      name: 'email',
    }, {
      type: 'password',
      name: 'password',
    }]);

    // get user token
    const { id: token, userId: personID } = await api.postPersonLogin({ email, password });

    // get accountID given personID
    const permissions = await api.getPersonResidentialPermissions({ personID, token });

    // get residenceID given accountID
    const accountID = permissions[0].residentialAccountId;
    const { primaryResidenceId: residenceID } = await api.getResidentialAccounts({ accountID, token })

    // get all the switches at a residence
    const switches = await api.getResidenceIotSwitches({ residenceID, token });

    // grab first switch
    const switchID = switches[0].id;

    // get current state
    const { power } = await api.getIotSwitch({ switchID, token });

    // toggle switch
    await api.putIotSwitch({
      switchID,
      power: power === 'ON' ? 'OFF' : 'ON',
      token,
    });

    // wait a bit
    await sleep(5000);

    // then toggle it back
    await api.putIotSwitch({
      switchID,
      power,
      token,
    })
  } catch (err) {
    console.log(err);
  }
})()
