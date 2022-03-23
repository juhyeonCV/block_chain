const BlockChain = require('./blockchain')

const bitcoin = new BlockChain();
//create new blocks

bitcoin.createNewBlock(1111,"previous Hash","hash1")
bitcoin.createNewBlock(2222,"hash1","hash2")
bitcoin.createNewBlock(3333,"hash2","hash3")

console.log(bitcoin);