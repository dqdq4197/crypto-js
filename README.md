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
- - ```@leo-util/crypto-js/seed```
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


## Release notes

### 4.2.0

Change default hash algorithm and iteration's for PBKDF2 to prevent weak security by using the default configuration.

Custom KDF Hasher

Blowfish support

### 4.1.1

Fix module order in bundled release.

Include the browser field in the released package.json.

### 4.1.0

Added url safe variant of base64 encoding. [357](https://github.com/brix/crypto-js/pull/357)

Avoid webpack to add crypto-browser package. [364](https://github.com/brix/crypto-js/pull/364)

### 4.0.0

This is an update including breaking changes for some environments.

In this version `Math.random()` has been replaced by the random methods of the native crypto module.

For this reason CryptoJS might not run in some JavaScript environments without native crypto module. Such as IE 10 or before or React Native.

### 3.3.0

Rollback, `3.3.0` is the same as `3.1.9-1`.

The move of using native secure crypto module will be shifted to a new `4.x.x` version. As it is a breaking change the impact is too big for a minor release.

### 3.2.1

The usage of the native crypto module has been fixed. The import and access of the native crypto module has been improved.

### 3.2.0

In this version `Math.random()` has been replaced by the random methods of the native crypto module.

For this reason CryptoJS might does not run in some JavaScript environments without native crypto module. Such as IE 10 or before.

If it's absolute required to run CryptoJS in such an environment, stay with `3.1.x` version. Encrypting and decrypting stays compatible. But keep in mind `3.1.x` versions still use `Math.random()` which is cryptographically not secure, as it's not random enough. 

This version came along with `CRITICAL` `BUG`. 

DO NOT USE THIS VERSION! Please, go for a newer version!

### 3.1.x

The `3.1.x` are based on the original CryptoJS, wrapped in CommonJS modules.


