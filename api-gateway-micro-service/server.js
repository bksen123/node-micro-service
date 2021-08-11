const path = require('path');
const gateway = require('express-gateway');
const user = require("./../users-micro-service/bin/www");
const crud = require("./../crud-micro-service/bin/www");
const transaction = require("./../transaction-micro-service/bin/www");
const os = require('os');
console.log('OS.hostname()========= ', os.hostname());
gateway()
  .load(path.join(__dirname, 'config'))
  .run();