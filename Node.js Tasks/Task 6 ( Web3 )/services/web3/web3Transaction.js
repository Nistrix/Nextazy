const { Web3 } = require("web3");
const fs = require('fs');
const web3 = new Web3(new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com"));
const CryptoPrivateKey = require("../../utils/cryptoPrivateKey");
const crypto = require("crypto");


let password;

// Read the JSON file
try {
  const data = fs.readFileSync('account.json', 'utf8');
  const jsonData = JSON.parse(data);
  senderAddress = jsonData.address;
  password = jsonData.key;
  console.log('Retrieved senderAddress:', senderAddress);   // Log the address for verification
} catch (error) {
  console.error('Error reading account.json:', error);
}

class sampleWeb3 {
  async createAccount(req, res) {
    try {
      // Generate a random 32-byte password (256 bits)
      const password = crypto.randomBytes(16).toString("hex");
      // console.log(password);

      senderAddress = CryptoPrivateKey.createAndEncryptAccount(password);

      // Save the address to a JSON file
      const dataToStore = { address: senderAddress, key: password };
      fs.writeFileSync("account.json",JSON.stringify(dataToStore, null, 2),"utf8");

      res.status(200).json({
        address: senderAddress,
        message: "Account created and encrypted.",
      });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ error: "Error creating and encrypting the account" });
    }
  }

  async getBalance(req, res) {
    try {
      if (!senderAddress) {
        res
          .status(400)
          .json({
            error: "Account not created. Please create an account first.",
          });
        return;
      }
      const balance = await web3.eth.getBalance(senderAddress);
      console.log(
        "Balance of the Account:",
        web3.utils.fromWei(balance, "ether"),
        "ETH"
      );
      res.json({ balance: web3.utils.fromWei(balance, "ether") });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Unable to fetch balance" });
    }
  }

  async sendTransaction(req, res) {
    try {
      if (!senderAddress) {
        res
          .status(400)
          .json({
            error: "Account not created. Please create an account first.",
          });
        return;
      }
      const { receiverAddress, amountInEther } = req.body;
      const amountToSend = web3.utils.toWei(amountInEther, "ether");

      // Decrypt the sender's private key
       const senderPrivateKey = CryptoPrivateKey.decryptPrivateKey(password);

      const transactionObject = {
        from: senderAddress,
        to: receiverAddress,
        value: amountToSend,
        gas: 21000,
        gasPrice: await web3.eth.getGasPrice(), //5. Getting safe gas price
      };

      const signedTx = await web3.eth.accounts.signTransaction(
        transactionObject,
        senderPrivateKey
      );
      const receipt = await web3.eth.sendSignedTransaction(
        signedTx.rawTransaction
      );

      console.log("Transaction receipt:", receipt);
      res.status(200).json({ receipt });
    } catch (error) {
      console.log(error);

      res.status(500).json({ error: "Error sending transaction" });
    }
  }
}

module.exports = new sampleWeb3();
