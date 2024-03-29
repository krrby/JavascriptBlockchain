
const SHA256 = require('crypto-js/sha256')

class Block {
		
    constructor(index, timestamp, data, previousHash = '') {
            this.index = index;
            this.timestamp = timestamp;
            this.data = data;
            this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
    }
}

class Blockchain {
    constructor(){
            this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock() {
            return new Block(0, "01/01/2019", "Genesis block", "0");
    }

    getLatestBlock() {
            return this.chain[this.length -1];
    }

    addBlock(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.hash = newBlock.calculateHash();
            this.chain.push(newBlock);
    }
}

let digetCoin = new Blockchain();
digetCoin.addBlock(new Block(1, "10/07/2017", {amount: 4}));
digetCoin.addBlock(new Block(2, "12/07/207", {amount: 10}));

console.log(JSON.stringify(digetCoin, null, 4));

