const express = require("express");
const app = express();


app.use(express.json());

const routes  = require("./routes/web3Routes");
app.use(routes);

app.listen(3000, () => {
  console.log("Web app is running on port 3000");
});

//safeGasPrice();