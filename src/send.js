const Babbage = require('@babbage/sdk')
const { Authrite } = require('authrite-js')
const atfinder = require('atfinder')

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
  const ourPaymail = await Babbage.ninja.getPaymail()
  const derivationPrefix = require('crypto')
    .randomBytes(10)
    .toString('base64')
  const suffix = require('crypto')
    .randomBytes(10)
    .toString('base64')
  const invoiceNumber = `3241645161d8 ${recipient} ${derivationPrefix} ${suffix}`
  // Derive the public key used for creating the output script
  const derivedPublicKey = await Babbage.getPublicKey({
    protocolID: [2, '3241645161d8'],
    keyID: `${recipient} ${derivationPrefix} ${suffix}`,
    counterparty: identityKey,
    invoiceNumber
  })
  // Create an output script that can only be unlocked with the corresponding derived private key
  const script = new bsv.Script(
    bsv.Script.fromAddress(bsv.Address.fromPublicKey(
      bsv.PublicKey.fromString(derivedAddress)
    ))
  ).toHex()
  const tx = await Babbage.createAction({
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
  const result = await atfinder
    .submitType42Payment(recipient, request, client)
  return result
}
