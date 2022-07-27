# paymail

Send and receive payments

The code is hosted [on GitHub](https://github.com/p2ppsr/paymail) and the package is available [through NPM](https://www.npmjs.com/package/paymail).

## Installation

    npm i paymail

## Example Usage

```js
const paymail = require('paymail')

paymail.send({
    recipient: 'ty@gateway.cash',
    amount: 69420,
    description: 'Here are some BitCoins'
})
})
```

## API

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

#### Table of Contents

*   [send](#send)
    *   [Parameters](#parameters)

### send

Send a payment with Paymail

#### Parameters

*   `obj` **[Object](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Object)** All parameters are given in an object

    *   `obj.recipient` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The recipient of the Paymail payment
    *   `obj.amount` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** The number of satoshis in the Paymail payment
    *   `obj.description` **[String](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/String)** The note sent with the payment

## License

The license for the code in this repository is the Open BSV License.
