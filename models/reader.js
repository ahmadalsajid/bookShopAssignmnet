const mongoose  = require('mongoose'),
      bcrypt    = require('bcrypt-nodejs');

var readerSchema = mongoose.Schema({
    //_id         : mongoose.Schema.ObjectId,
    name        : String,
    //username    : String,     //email is enough to verify sign in/login
    password    : String,
    email       : String,
    address     : String,
    mobile      : String,
    books       : [],
    imagePath   : String,
    roll        : {type: String, default: 'reader'}    //flag to detect reader
});


readerSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

readerSchema.methods.validPassword =function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Reader', readerSchema);