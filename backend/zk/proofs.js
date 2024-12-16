const snarkjs = require('snarkjs');
const fs = require('fs');
const path = require('path');

const generateProof = async (kills, threshold) => {
    const input = { kills, threshold };
    const wasmPath = path.join(__dirname, 'proof.wasm');
    const zkeyPath = path.join(__dirname, 'circuit');
}
