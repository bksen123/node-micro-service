const path = require('path');
const gateway = require('express-gateway');
const user = require("./../users-micro-service/bin/www");
const crud = require("./../crud-micro-service/bin/www");
const transaction = require("./../transaction-micro-service/bin/www");
const os = require('os');
console.log('system username== ', os.hostname());
// console.log('process', process.env.SERVER_USER_NAME);
if (process.env.SERVER_USER_NAME === os.hostname()) {
  gateway()
    .load(path.join(__dirname, 'live-config'))
    .run();
} else {
  gateway()
    .load(path.join(__dirname, 'dev-config'))
    .run();
}