const mongoose  = require('mongoose'),
    bcrypt    = require('bcrypt-nodejs');

var publisherSchema = mongoose.Schema({
    //_id         : mongoose.Schema.ObjectId,
    name        : String,
    //username    : String,         //email is enough to verify sign in/login
    password    : String,
    email       : String,
    address     : String,
    contact     : String,   //[String],
    //image     : need to study
    roll        : {type: String, default: 'publisher'}       //flag to detect publisher
});


publisherSchema.methods.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

publisherSchema.methods.validPassword =function (password) {
    return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Publisher', publisherSchema);