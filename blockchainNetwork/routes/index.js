var express = require('express');
const res = require('express/lib/response');
var router = express.Router();
const BlockChain = require("../blockchain")
const{v4:uuid}  = require('uuid')
const nodeAddress = uuid().split('-').join('')
console.log("minerId: ", nodeAddress)

/* GET home page. */
const bitcoin = new BlockChain
const rp = require("request-promise")


router.get('/', function(req, res, next) {
  res.send("Test");
});

router.get('/blockchain', (req,res)=>{
  res.send(bitcoin)
})
router.post('/transaction',(req,res)=>{
  const newTransaction = req.body.newTransaction
  const blockIndex = bitcoin.addTransactionToPendingTransaction(newTransaction)
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


router.post('/register-broadcast-node', function(req,res){
  const newNodeUrl = req.body.newNodeUrl;
  if(bitcoin.networkNodes.indexOf(newNodeUrl)== -1){
    bitcoin.networkNodes.push(newNodeUrl)
  }
  const regNodePromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl =>{
    const requestOptions = {
      uri : networkNodeUrl +'/register-node',
      method : 'POST',
      body :{newNodeUrl:newNodeUrl},
      json:true
    }
    regNodePromises.push(rp(requestOptions))
  })
  Promise.all(regNodePromises)
  .then(data=>{
  const bulkRegisterOptions = {
    uri:newNodeUrl +'/register-nodes-bulk',
    method:'POST',
    body:{allNetworkNodes:[...bitcoin.networkNodes,bitcoin.currentNodeUrl]},
    json:true
  }
  return rp(bulkRegisterOptions)
})
.then(data =>{
  res.json({note : "New Node registered with network successfully"})
})


})


router.post('/register-node', function(req,res){
  const newNodeUrl = req.body.newNodeUrl;
  const nodeNotAlreadyPresent  = bitcoin.networkNodes.indexOf(newNodeUrl)==-1;
  console.log("nodeNotAlreadyPresent : ", nodeNotAlreadyPresent);
  const notCurrent = bitcoin.currentNodeUrl !== newNodeUrl;
  if(nodeNotAlreadyPresent && notCurrent){
    bitcoin.networkNodes.push(newNodeUrl)
  }
  res.json({note: " New Node registered successfully"})
})
router.post('/register-nodes-bulk', function(req,res){
  const allNetworkNodes = req.body.allNetworkNodes;

  allNetworkNodes.forEach(networkNodeUrl =>{
    const nodeNotAlreadyPresent = bitcoin.networkNodes.indexOf(networkNodeUrl) ==-1;
    const notCurrentNode = bitcoin.currentNodeUrl !== networkNodeUrl;
    if(nodeNotAlreadyPresent && notCurrentNode){
      console.log(networkNodeUrl)
      bitcoin.networkNodes.push(networkNodeUrl)
    }
  })
  res.json({note: "All Node  registered successfully"})

})
router.post('/transaction/broadcast', function(req,res){
  const newTransaction = bitcoin.createNewTransaction(req.body.amount,
                                                      req.body.sender,
                                                      req.body.recipient);
  bitcoin.addTransactionToPendingTransaction(newTransaction)
  const requestPromises = [];
  bitcoin.networkNodes.forEach(networkNodeUrl =>{
    const requestOptions = {
      uri : networkNodeUrl +'/transaction',
      method : 'POST',
      body :{newTransaction:newTransaction},
      json:true
    }
    requestPromises.push(rp(requestOptions))
  })
  Promise.all(requestPromises)
  .then(data => {
    res.json({note: "Transaction created and broadcast successfully"})
  })
})
module.exports = router;

