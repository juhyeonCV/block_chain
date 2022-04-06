const sha256 = require('sha256')

function BlockChain(){
    this.chain = [];
    this.pendingTransaction = [];
    this.createNewBlock(100,'0','0')
}
//New block function
BlockChain.prototype.createNewBlock = function(nonce, previousBlockHash, hash){
    const newBlock = {
        index: this.chain.length +1,
        timestamp : Date.now(),
        transactions:this.pendingTransaction,
        nonce:nonce,
        hash : hash,
        previousBlockHash : previousBlockHash
    }
    this.chain.push(newBlock);
    this.pendingTransaction = [];
    return newBlock
}

BlockChain.prototype.getLastBlock =  function() {
    
    return this.chain[this.chain.length-1];
}
//New transaction fucntion
BlockChain.prototype.createNewTransaction = function(amount, sender,recipient){
    const newTransaction = {
        amount : amount,
        sender : sender,
        recipient : recipient
    }
    this.pendingTransaction.push(newTransaction)
    return this.getLastBlock()['index'] + 1
}
BlockChain.prototype.hashBlock = function (previousBlockHash, currentTransactions, nonce){
    const dataAsString = previousBlockHash + (nonce+'').toString() + JSON.stringify(currentTransactions)
    return sha256(dataAsString)
}

BlockChain.prototype.proofOfWork = function(previousBlockHash, cunrrentBlockData){
    this.difficulty = 3
    let nonce = 0
    const target = '0'.repeat(this.difficulty)
    while(true){
        var currentHash  = this.hashBlock(previousBlockHash,cunrrentBlockData,nonce)
        //console.log(`nonce : ${nonce} | hash : ${currentHash}`)
        if (target == currentHash.substring(0,this.difficulty)){
            return nonce}
        
        else{
            nonce++
        } 
    }
}

module.exports = BlockChain;