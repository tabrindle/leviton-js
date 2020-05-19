const api = require('./index');
const inquirer = require('inquirer');
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

(async () => {
  try {
    const { email, password } = await inquirer.prompt([{
      type: 'input',
      name: 'email',
    }, {
      type: 'password',
      name: 'password',
    }]);
    const { id: token, userId: personID } = await api.postPersonLogin({ email, password });
    const permissions = await api.getPersonResidentialPermissions({ personID, token });
    const accountID = permissions[0].residentialAccountId;
    const { primaryResidenceId: residenceID } = await api.getResidentialAccounts({ accountID, token })
    const switches = await api.getResidenceIotSwitches({ residenceID, token });
    const switchID = switches[0].id;
    const { power } = await api.getIotSwitch({ switchID, token });

    await api.putIotSwitch({
      switchID,
      power: power === 'ON' ? 'OFF' : 'ON',
      token,
    });
    await sleep(5000);
    await api.putIotSwitch({
      switchID,
      power,
      token,
    })
  } catch (err) {
    console.log(err);
  }
})()
