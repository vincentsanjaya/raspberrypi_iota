const temp = require('./fetchTemp.js')
const { init } = require('./zmqWatcher.js')

/// IOTA Setup
const IOTA = require('@iota/core');
const Converter = require('@iota/converter');
const iota = IOTA.composeAPI({ provider: 'https://nodes.devnet.thetangle.org:443' }); // change this by checking public node service of IOTA
const iotaSeed =
  'PUEOTSEITFEVEWCWBTSIZM9NKRGJEIMXTULBACGFRQK9IMGICLBKW9TTEVSDQMGWKBXPVCBMMCXWMNPDX';// you can use your own seed
const dataLocation =
  'DATA9ADDRESS9DATA9ADDRESS9DATA9ADDRESS9DATA9ADDRESS9DATA9ADDRESS9DATA9ADDRESS9DAT';// this is IOTA foundation testing address

console.log("Starting app");

/// Send IOTA Transaction
const sendTx = data => {
  const message = Converter.asciiToTrytes(JSON.stringify({ temperature: data }))
  const transactions = [ //prepare the transaction in JSON
    {
      value: 0,
      address: dataLocation, // Where the data is being sent
      message: message // The message converted into trytes
    }
  ]

  iota
    .prepareTransfers(iotaSeed, transactions) //prepareTransfer(own_seed, data)
    .then(trytes => iota.sendTrytes(trytes, 3, 9))
    .then(bundle => {
      console.log('Transfer successfully sent')
      bundle.map(tx => console.log(tx))
    })
    .catch(err => { //error exception and show error
      console.log(err)
    })
}

const sendTemp = async () => {
  //   Capture Data
  const data = await temp()
  // Send the data
  console.log('Current temp: ' + data)
  const message = Converter.asciiToTrytes(JSON.stringify({ temperature: data }))
  const transactions = [
    {
      value: 0,
      address: dataLocation, // Where the data is being sent
      message: message // The message converted into trytes
    }
  ]
  sendTx(transactions)
}

const sendAddress = () => {
  console.log('New message found!')
}

init(sendAddress)
setTimeout(() => sendTemp(), 20000)
