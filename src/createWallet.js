const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');


const network = bitcoin.networks.testnet;

const path = `m/49'/1'/0'/0`

let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

let root = bip32.fromSeed(seed, network);

let account = root.derivePath(path);
let node = account.derive(0).derive(0);

let bech32Address = bitcoin.payments.p2wpkh({

    pubkey: node.publicKey,

    network: network,

}).address;

console.log(`Carteira gerada:
    Endereço: ${bech32Address},
    Chave privada: ${node.toWIF()}
    Seed: ${mnemonic}`);


