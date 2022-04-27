const BlockChain = require('./blockchain')

const bitcoin = new BlockChain();
//create new blocks

// bitcoin.createNewBlock(1111,"previous Hash","hash1")
// bitcoin.createNewBlock(2222,"hash1","hash2")
// bitcoin.createNewBlock(3333,"hash2","hash3")
// bitcoin.createNewTransaction(100, "kim","lee")
// bitcoin.createNewTransaction(200, "kim2","lee2")
// bitcoin.createNewTransaction(300, "kim3","lee3")
// bitcoin.createNewBlock(4444, "hash3", "hash4")
// console.log(bitcoin);
// console.log(bitcoin.getLastBlock())

const previousBlockHash = "abc"
const currentTransactions = [ 
    { amount: 100, sender: 'kim', recipient: 'lee' },
    { amount: 200, sender: 'kim1', recipient: 'lee2' },
    { amount: 300, sender: 'kim3', recipient: 'lee3' }
]
let POWnonce = bitcoin.proofOfWork(previousBlockHash,currentTransactions)
console.log(`nonce for newHas : ${POWnonce}`)
console.log(bitcoin.hashBlock(previousBlockHash,currentTransactions))
let newHashBlock = bitcoin.hashBlock(previousBlockHash,currentTransactions,POWnonce)
console.log("HashBlock:",newHashBlock)