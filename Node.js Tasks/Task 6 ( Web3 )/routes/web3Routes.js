const sampleWeb3 = require('../services/web3/web3Transaction.js');

const router = require('express').Router();


router.get('/createAccount', sampleWeb3.createAccount );
router.get('/getBalance', sampleWeb3.getBalance);
router.post('/sendTransaction', sampleWeb3.sendTransaction);

module.exports = router;


