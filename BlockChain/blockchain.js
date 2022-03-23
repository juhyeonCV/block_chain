function BlockChain(){
    this.chain = [];
    this.pendingTransaction = [];
}

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

module.exports = BlockChain;