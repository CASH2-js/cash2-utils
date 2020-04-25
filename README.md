# CASH2 Utils

## Examples

generate keys from entropy.

```javascript
const cash2Utils = require('./cash2-utils')

let keys = cash2Utils.Address.fromEntropy('entropy', 'english', 6)

let address = keys.toString()

console.log(keys, address)

```