//Database 
require('dotenv').config();
module.exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/collectiv-db';

//Server listening port
module.exports.PORT = process.env.PORT || 8080;

//JWT Secret/Expiry
module.exports.JWT_SECRET = process.env.JWT_SECRET || 'testing';
module.exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';


//AWS S3 Configuration keys
exports.AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY_ID;
exports.AWS_SECRET_KEY = process.env.AWS_SECRET_ACCESS_KEY;
exports.AWS_BUCKET = process.env.AWS_BUCKET;