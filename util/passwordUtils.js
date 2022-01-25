//module that allos us to generate and validate passwords

//import crypto module
const crypto = require(`crypto`);


const genPassword = (password) =>{
    const salt = crypto.randomBytes(32).toString(`hex`);
    const genHash = crypto.pbkdf2Sync(password, salt,10000,64,`sha512`).toString(`hex`);
    return {
        salt: salt,
        hash: genHash
    };
};

const isValidPassword = (password, hash, salt) => {
    const hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, `sha512`).toString(`hex`);
    return hash === hashVerify;
};

module.exports.isValidPassword = isValidPassword;
module.exports.genPassword = genPassword;
