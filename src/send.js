const Babbage = require('@babbage/sdk')
const { Authrite } = require('authrite-js')
const atfinder = require('atfinder')
const bsv = require('bsv')

/**
 * Send a payment with Paymail
 * @param {Object} obj All parameters are given in an object
 * @param {String} obj.recipient The recipient of the Paymail payment
 * @param {Number} obj.amount The number of satoshis in the Paymail payment
 * @param {String} obj.description The note sent with the payment
 */
module.exports = async ({
  recipient,
  amount,
  description
}) => {
  const client = new Authrite()
  const { identityKey } = await atfinder.getCertifiedKey(recipient, client)
  const ourPaymail = await Babbage.getPaymail()
  const derivationPrefix = require('crypto')
    .randomBytes(10)
    .toString('base64')
  const suffix = require('crypto')
    .randomBytes(10)
    .toString('base64')
  // Derive the public key used for creating the output script
  const derivedPublicKey = await Babbage.getPublicKey({
    protocolID: [2, '3241645161d8'],
    keyID: `${recipient} ${derivationPrefix} ${suffix}`,
    counterparty: identityKey
  })
  // Create an output script that can only be unlocked with the corresponding derived private key
  const script = new bsv.Script(
    bsv.Script.fromAddress(bsv.Address.fromPublicKey(
      bsv.PublicKey.fromString(derivedPublicKey)
    ))
  ).toHex()
  let tx = await Babbage.createAction({
    description,
    outputs: [{
      script,
      satoshis: parseInt(amount)
    }]
  })
  tx.outputs = {
    0: {
      suffix
    }
  }
  const request = {
    protocol: '3241645161d8',
    senderPaymail: ourPaymail,
    note: description,
    transactions: [tx],
    derivationPrefix
  }
  return atfinder.submitType42Payment(recipient, request, client)
}
