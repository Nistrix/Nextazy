const express = require("express");
const app = express();
const { Web3 } = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com")
);

// Seeded -- sender's private key and address
const senderPrivateKey ="";
const senderAddress = "0x641f98b8AF8c3da987274c7F3ac63271516c05Cc";

app.use(express.json());

// 1. Creating a new account
app.get("/createAccount", (req, res) => {
  const account = web3.eth.accounts.create();
  console.log("New Account:", account);
  res.json({ account });
});

// 3. Getting Balance of the account
app.get("/getBalance", async (req, res) => {
  try {
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
});

// 5. Getting safe gas price
async function safeGasPrice() {
  try {
    const gasPrice = await web3.eth.getGasPrice();
    console.log(
      "Current gas price:",
      web3.utils.fromWei(gasPrice, "gwei"),
      "Gwei"
    );
    return gasPrice;
  } catch (error) {
    console.log(error);
  }
}

// 4. Send a transaction to another address
app.post("/sendTransaction", async (req, res) => {
  try {
    const { receiverAddress, amountInEther } = req.body;
    const amountToSend = web3.utils.toWei(amountInEther, "ether");

    const transactionObject = {
      from: senderAddress,
      to: receiverAddress,
      value: amountToSend,
      gas: 21000,
      gasPrice: await web3.eth.getGasPrice() //5. Getting safe gas price
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transactionObject,
      senderPrivateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction receipt:", receipt);

    res.json({ receipt });
  } catch (error) {
    console.log(error);

    res.status(500).json({ error: "Error sending transaction" });
  }
});

app.listen(3000, () => {
  console.log("Web app is running on port 3000");
});

