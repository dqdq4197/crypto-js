<div>
  <a href="https://www.npmjs.com/package/@leo-util/crypto-js">
    <img src="https://img.shields.io/npm/v/%40leo-util%2Fcrypto-js" alt="version" />
  </a>
  <a href="https://www.npmjs.com/package/@leo-util/crypto-js">
    <img src="https://img.shields.io/npm/d18m/%40leo-util%2Fcrypto-js" alt="downloads" />
  </a>
  <a href="https://bundlephobia.com/package/@leo-util/crypto-js@4.3.0">
    <img src="https://img.shields.io/bundlephobia/min/%40leo-util%2Fcrypto-js" alt="bundle size" />
  </a>
   <a href="https://www.npmjs.com/package/@leo-util/crypto-js">
    <img src="https://img.shields.io/npm/l/%40leo-util%2Fcrypto-js" alt="downloads" />
  </a>
</div>

# crypto-js

JavaScript library of crypto standards.

### About This Package

This package is a fork of [crypto-js](https://github.com/brix/crypto-js), with added support for SEED encryption and Type Definitions, and has been republished as a separate library.

#### 🔹 Enhancements & Fixes
1. Fixed Typo in `AnsiX923` Padding Module
   - Resolved an issue where a typo in the `AnsiX923` padding module prevented it from functioning correctly in the original `crypto-js`.
2. Added SEED Algorithm Module
   - Integrated the `SEED` encryption algorithm, which is not included in the original `crypto-js`, from an [external package](https://github.com/tomyun/crypto-js).
3. Included Type Definitions
   - Eliminates the need to install `@types/crypto-js` separately, as Type Definitions are now bundled within this package.

🔹 Why This Package?

The native Crypto module in Node.js does not support `SEED` encryption, making it necessary to extend crypto-js to provide this functionality. This package allows developers to use `SEED` encryption seamlessly in their projects. 🚀

## Node.js (Install)

Requirements:

- Node.js

```
$ npm install @leo-util/crypto-js
```

### Usage

ES6 import for typical API call signing use case:

```typescript
import sha256 from '@leo-util/crypto-js/sha256';
import hmacSHA512 from '@leo-util/crypto-js/hmac-sha512';
import Base64 from '@leo-util/crypto-js/enc-base64';

const message, nonce, path, privateKey; // ...
const hashDigest = sha256(nonce + message);
const hmacDigest = Base64.stringify(hmacSHA512(path + hashDigest, privateKey));
```

Modular include:

```typescript
const AES = require("@leo-util/crypto-js/aes");
const SHA256 = require("@leo-util/crypto-js/sha256");
...
console.log(SHA256("Message"));
```

Including all libraries, for access to extra methods:

```typescript
const CryptoJS = require("@leo-util/crypto-js");
console.log(CryptoJS.HmacSHA1("Message", "Key"));
```

## API

See: https://cryptojs.gitbook.io/docs/

### SEED Encryption

#### Plain text encryption

```typescript
const CryptoJS = require("@leo-util/crypto-js");

// Encrypt
const ciphertext = CryptoJS.SEED.encrypt('my message', 'secret key 123', {
  mode: CryptoJS.mode.ECB, // CryptoJS.mode.CBC, ...
  padding: CryptoJS.pad.ZeroPadding, // CryptoJS.pad.Pkcs7, ...
  // iv...
});

// Decrypt
const bytes  = CryptoJS.SEED.decrypt(ciphertext, 'secret key 123', {
  mode: CryptoJS.mode.ECB
  padding: CryptoJS.pad.ZeroPadding
});
const originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
```

### AES Encryption

#### Plain text encryption

```typescript
const CryptoJS = require("@leo-util/crypto-js");

// Encrypt
const ciphertext = CryptoJS.AES.encrypt('my message', 'secret key 123').toString();

// Decrypt
const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
const originalText = bytes.toString(CryptoJS.enc.Utf8);

console.log(originalText); // 'my message'
```

#### Object encryption

```typescript
const CryptoJS = require("@leo-util/crypto-js");

const data = [{id: 1}, {id: 2}]

// Encrypt
const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key 123').toString();

// Decrypt
const bytes  = CryptoJS.AES.decrypt(ciphertext, 'secret key 123');
const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

console.log(decryptedData); // [{id: 1}, {id: 2}]
```

### List of modules


- ```@leo-util/crypto-js/core```
- ```@leo-util/crypto-js/x64-core```
- ```@leo-util/crypto-js/lib-typedarrays```

---

- ```@leo-util/crypto-js/md5```
- ```@leo-util/crypto-js/sha1```
- ```@leo-util/crypto-js/sha256```
- ```@leo-util/crypto-js/sha224```
- ```@leo-util/crypto-js/sha512```
- ```@leo-util/crypto-js/sha384```
- ```@leo-util/crypto-js/sha3```
- ```@leo-util/crypto-js/ripemd160```

---

- ```@leo-util/crypto-js/hmac-md5```
- ```@leo-util/crypto-js/hmac-sha1```
- ```@leo-util/crypto-js/hmac-sha256```
- ```@leo-util/crypto-js/hmac-sha224```
- ```@leo-util/crypto-js/hmac-sha512```
- ```@leo-util/crypto-js/hmac-sha384```
- ```@leo-util/crypto-js/hmac-sha3```
- ```@leo-util/crypto-js/hmac-ripemd160```

---

- ```@leo-util/crypto-js/pbkdf2```

---

- ```@leo-util/crypto-js/aes```
- ```@leo-util/crypto-js/seed```
- ```@leo-util/crypto-js/tripledes```
- ```@leo-util/crypto-js/rc4```
- ```@leo-util/crypto-js/rabbit```
- ```@leo-util/crypto-js/rabbit-legacy```
- ```@leo-util/crypto-js/evpkdf```

---

- ```@leo-util/crypto-js/format-openssl```
- ```@leo-util/crypto-js/format-hex```

---

- ```@leo-util/crypto-js/enc-latin1```
- ```@leo-util/crypto-js/enc-utf8```
- ```@leo-util/crypto-js/enc-hex```
- ```@leo-util/crypto-js/enc-utf16```
- ```@leo-util/crypto-js/enc-base64```

---

- ```@leo-util/crypto-js/mode-cfb```
- ```@leo-util/crypto-js/mode-ctr```
- ```@leo-util/crypto-js/mode-ctr-gladman```
- ```@leo-util/crypto-js/mode-ofb```
- ```@leo-util/crypto-js/mode-ecb```

---

- ```@leo-util/crypto-js/pad-pkcs7```
- ```@leo-util/crypto-js/pad-ansix923```
- ```@leo-util/crypto-js/pad-iso10126```
- ```@leo-util/crypto-js/pad-iso97971```
- ```@leo-util/crypto-js/pad-zeropadding```
- ```@leo-util/crypto-js/pad-nopadding```
