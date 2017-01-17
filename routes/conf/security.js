const fs = require('fs');

const salt = 'ssssaalllltt!';

// sign with RSA SHA256 (2048bit의 키 길이)
const privateKey = fs.readFileSync('private.key');  // get private key
const publicKey = fs.readFileSync('public.pem');  // get public key

exports.salt = salt;
exports.privateKey = privateKey;
exports.publicKey = publicKey;
