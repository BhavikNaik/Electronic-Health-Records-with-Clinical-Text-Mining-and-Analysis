const multer = require('multer');
const fs = require('fs');



const UserDataMW= multer({storage: multer.memoryStorage() })


module.exports = {UserDataMW};