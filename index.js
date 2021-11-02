const { getLSaccount } = require('./untli/index');

async function getResult(){
    getLSaccount('POSITION','15m')
}
getResult()