'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.JWTGet = JWTGet;
exports.JWTPost = JWTPost;
const jwt = require('jsonwebtoken');
const fs = require('fs');
//
const privateKeyFile = './private.key';
// const apiKey = 'phk3goz7y02jvj65em0m21azcq1qr7abduimch9isoe4jkor';
const apiKey = 'l2nqkzkytjj1cdcih5cik090v6f75o1pa04irfeow06n7idc';
const payload = {
  sub: 'joelTest',
  name: 'Joel Test',
  exp: Math.floor(Date.now() / 1000) + 60 * 10
};
const privateKey = fs.readFileSync(privateKeyFile).toString();
const token = jwt.sign(payload, privateKey, { algorithm: 'RS256' });

function JWTGet(req, res) {
  let viewData;
  viewData = {};

  console.log(privateKey);

  return res.render('prototypes/jwt/index', viewData);
}

function JWTPost(req, res) {
  try {
    res.json({ token });
  } catch (e) {
    res.status(500);
    res.send('Failed to generate jwt token.');
    console.error(e.message);
  }
}