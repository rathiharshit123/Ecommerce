const p = require('pino')();
const logger = p.child({appName: 'Ecommerce'});

module.exports = logger;