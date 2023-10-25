const { Web3 } = require("web3");
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://polygon-mumbai-bor.publicnode.com")
);

// Seeded -- sender's private key and address
const senderPrivateKey ="";
const senderAddress = "0x641f98b8AF8c3da987274c7F3ac63271516c05Cc";

async function performTransaction() {
  // 1. Creating a new account for each transaction
  const account = web3.eth.accounts.create();
  console.log("New Account:", account);

  try {
    // 3. Getting Balance of the new account
    const balance = await web3.eth.getBalance(senderAddress);
    console.log(
      "Balance of New Account:",
      web3.utils.fromWei(balance, "ether"),
      "ETH"
    );

    // 6. Get the current gas price
    const gasPrice = await web3.eth.getGasPrice();
    console.log(
      "Current gas price:",
      web3.utils.fromWei(gasPrice, "gwei"),
      "Gwei"
    );

    // 4. Send a transaction to another address
    const receiverAddress = "0x6AB860aD68E7d37f0F380DfA44305F9F5F0A4f69"; 
    const amountToSend = web3.utils.toWei("0.00000001", "ether");

    const transactionObject = {
      from: account.address,
      to: receiverAddress,
      value: amountToSend,
      gas: 21000,
      gasPrice: gasPrice,
    };

    const signedTx = await web3.eth.accounts.signTransaction(
      transactionObject,
      senderPrivateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log("Transaction receipt:", receipt);

    //Updated balance after sending the transaction
    const updatedBalance = await web3.eth.getBalance(senderAddress);
    console.log(
      "Updated balance of New Account:",
      web3.utils.fromWei(updatedBalance, "ether"),
      "ETH"
    );
  } catch (error) {
    console.error("Error:", error);
  }
}

performTransaction();
