#string-some

## Install

```bash
$ npm install string-some
```

## Example

```javascript
const some = require("string-some");

some("aBc", function(ch){return ch === ch.toUpperCase();}); // true
some("abc", function(ch){return ch === ch.toUpperCase();}); // false

some("123", isNaN); // false
some("1a3", isNaN); // true
```

## Test

```bash
$ npm install
$ npm test
```