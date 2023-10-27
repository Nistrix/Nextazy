const crypto = require("crypto");
const fs = require("fs");
const web3 = require('web3');

const privateKeyFile = "privateKey.json"; // JSON file to store the encrypted private key

const CryptoPrivateKey = {
  createAndEncryptAccount: function (password) {
    const account = web3.eth.accounts.create();
    const privateKey = account.privateKey;

    // Encrypt the private key
    const encryptedPrivateKey = this.encrypt(privateKey, password);

    // Save the encrypted private key to a JSON file
    fs.writeFileSync(privateKeyFile,JSON.stringify({ encryptedPrivateKey }),"utf8");
    return account.address;
  },

  encrypt: function (text, password) {
    const iv = crypto.randomBytes(16);
    let cipher = crypto.createCipheriv("aes-256-cbc",Buffer.from(password),iv);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  },

  decryptPrivateKey: function (password) {
    try {
      // Read the encrypted private key from the JSON file
      const fileContent = fs.readFileSync(privateKeyFile, "utf8");
      const { encryptedPrivateKey } = JSON.parse(fileContent);

      // Decrypt the private key using the provided password
      const privateKey = this.decrypt(encryptedPrivateKey, password);
      return privateKey;
    } catch (err) {
      console.log(err);
      return null;
    }
  },

  decrypt: function (text, password) {
    try {
      let textParts = text.split(":");
      let iv = Buffer.from(textParts[0], "hex");
      let encryptedText = Buffer.from(textParts[1], "hex");
      let decipher = crypto.createDecipheriv("aes-256-cbc",Buffer.from(password),iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      return decrypted.toString();
    } catch (err) {
      console.log(err);
      return null;
    }
  },
};

module.exports = CryptoPrivateKey;
