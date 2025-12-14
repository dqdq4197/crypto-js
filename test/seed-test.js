YUI.add(
  "algo-seed-test",
  function (Y) {
    var C = CryptoJS;

    Y.Test.Runner.add(
      new Y.Test.Case({
        name: "SEED",

        /**
         * SEED는 128비트(16바이트) 고정 길이 대칭키를 사용한다.
         * 키가 128비트를 초과하는 경우, 구현체에서 앞 128비트만 사용하므로
         * 더 긴 키를 전달하더라도 암호화/복호화 결과는 동일하다.
         */
        testEncryptKeySize128: function () {
          Y.Assert.areEqual(
            "c1f2f511296263d0f38e4a99c2b0ba8a",
            C.SEED.encrypt(
              C.enc.Hex.parse("00112233445566778899aabbccddeeff"),
              C.enc.Hex.parse("9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e2"),
              { mode: C.mode.ECB, padding: C.pad.ZeroPadding }
            ).ciphertext.toString()
          );
        },

        testEncryptKeySize192: function () {
          Y.Assert.areEqual(
            "c1f2f511296263d0f38e4a99c2b0ba8a",
            C.SEED.encrypt(
              C.enc.Hex.parse("00112233445566778899aabbccddeeff"),
              C.enc.Hex.parse(
                "9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e21011121314151617"
              ),
              { mode: C.mode.ECB, padding: C.pad.ZeroPadding }
            ).ciphertext.toString()
          );
        },

        testDecryptKeySize128: function () {
          Y.Assert.areEqual(
            "00112233445566778899aabbccddeeff",
            C.SEED.decrypt(
              C.lib.CipherParams.create({
                ciphertext: C.enc.Hex.parse("c1f2f511296263d0f38e4a99c2b0ba8a"),
              }),
              C.enc.Hex.parse("9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e2"),
              { mode: C.mode.ECB, padding: C.pad.ZeroPadding }
            ).toString()
          );
        },

        testDecryptKeySize192: function () {
          Y.Assert.areEqual(
            "00112233445566778899aabbccddeeff",
            C.SEED.decrypt(
              C.lib.CipherParams.create({
                ciphertext: C.enc.Hex.parse("c1f2f511296263d0f38e4a99c2b0ba8a"),
              }),
              C.enc.Hex.parse(
                "9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e21011121314151617"
              ),
              { mode: C.mode.ECB, padding: C.pad.ZeroPadding }
            ).toString()
          );
        },

        testMultiPart: function () {
          var seed = C.algo.SEED.createEncryptor(
            C.enc.Hex.parse("9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e2"),
            { mode: C.mode.ECB, padding: C.pad.ZeroPadding }
          );
          var ciphertext1 = seed.process(C.enc.Hex.parse("001122334455"));
          var ciphertext2 = seed.process(C.enc.Hex.parse("66778899aa"));
          var ciphertext3 = seed.process(C.enc.Hex.parse("bbccddeeff"));
          var ciphertext4 = seed.finalize();

          Y.Assert.areEqual(
            "c1f2f511296263d0f38e4a99c2b0ba8a",
            ciphertext1
              .concat(ciphertext2)
              .concat(ciphertext3)
              .concat(ciphertext4)
              .toString()
          );
        },

        testInputIntegrity: function () {
          var message = C.enc.Hex.parse("00112233445566778899aabbccddeeff");
          var key = C.enc.Hex.parse("9f3c7a1e4b8d2c6a0e5f91d4a7b3c8e2");
          var iv = C.enc.Hex.parse("101112131415161718191a1b1c1d1e1f");

          var expectedMessage = message.toString();
          var expectedKey = key.toString();
          var expectedIv = iv.toString();

          C.SEED.encrypt(message, key, {
            mode: C.mode.CBC,
            padding: C.pad.NoPadding,
            iv,
          });

          Y.Assert.areEqual(expectedMessage, message.toString());
          Y.Assert.areEqual(expectedKey, key.toString());
          Y.Assert.areEqual(expectedIv, iv.toString());
        },

        testHelper: function () {
          // Save original random method
          var random = C.lib.WordArray.random;

          // Replace random method with one that returns a predictable value
          C.lib.WordArray.random = function (nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push([0x11223344]);
            }

            return C.lib.WordArray.create(words, nBytes);
          };

          // Test
          Y.Assert.areEqual(
            C.algo.SEED.createEncryptor(C.SHA256("Jefe"), {
              mode: C.mode.ECB,
              padding: C.pad.NoPadding,
            })
              .finalize("Hi There")
              .toString(),
            C.SEED.encrypt("Hi There", C.SHA256("Jefe"), {
              mode: C.mode.ECB,
              padding: C.pad.NoPadding,
            }).ciphertext.toString()
          );
          Y.Assert.areEqual(
            C.lib.SerializableCipher.encrypt(
              C.algo.SEED,
              "Hi There",
              C.SHA256("Jefe"),
              { mode: C.mode.ECB, padding: C.pad.NoPadding }
            ).toString(),
            C.SEED.encrypt("Hi There", C.SHA256("Jefe"), {
              mode: C.mode.ECB,
              padding: C.pad.NoPadding,
            }).toString()
          );
          Y.Assert.areEqual(
            C.lib.PasswordBasedCipher.encrypt(C.algo.SEED, "Hi There", "Jefe", {
              mode: C.mode.ECB,
              padding: C.pad.NoPadding,
            }).toString(),
            C.SEED.encrypt("Hi There", "Jefe", {
              mode: C.mode.ECB,
              padding: C.pad.NoPadding,
            }).toString()
          );

          // Restore random method
          C.lib.WordArray.random = random;
        },
      })
    );
  },
  "$Rev$"
);
