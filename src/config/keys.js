let { NODE_ENV } = process.env;

if (NODE_ENV === 'production') { 
    module.exports = require('./prod') 
} else { 
    module.exports = require('./dev')
};