var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const BlockChain = require("../blockchain")
const{v4:uuid}  = require('uuid')
const nodeAddress = uuid().split('-').join('')
console.log("minerId: ", nodeAddress)
/* GET home page. */
const bitcoin = new BlockChain
router.get('/', function(req, res, next) {
  res.send("Test");
});

router.get('/blockchain', (req,res)=>{
  res.send(bitcoin)
})
router.post('/transaction',(req,res)=>{
  const blockIndex = bitcoin.createNewTransaction(req.body.amount,req.body.sender, req.body.recipient)
  console.log(req.body.amount,req.body.sender, req.body.recipient)
  res.json({note:`pendingTransaction${blockIndex}`})
})

router.get('/mine', function(req,res){
  const lastBlock = bitcoin.getLastBlock();
  const previousBlockHash = lastBlock['hash']
  const cunrrentBlockData ={
    transations:bitcoin.pendingTransaction,
    index:lastBlock['index'] +1
  }
  const nonce = bitcoin.proofOfWork(previousBlockHash,cunrrentBlockData)
  const blockHash = bitcoin.hashBlock(previousBlockHash, cunrrentBlockData, nonce)
  const newBlock = bitcoin.createNewBlock(nonce,previousBlockHash,blockHash)

  bitcoin.createNewTransaction(10,"reward000",nodeAddress)
  res.json({note:"created new block",
            newBlock:newBlock})
})


module.exports = router;
