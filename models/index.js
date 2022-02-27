const user = require('./users');
const image = require('./images');
module.exports = {
    ...user,
    ...image
}
