mongoose = require('mongoose');

// 定义数据模型
var userSchema = mongoose.Schema({
    username: {type: String, require: true, unique: true},
    password: {type: String, require: true,},
    createAt: {type: Date, default: Date.now},
    displayName: String,
    bio: String
});

// 在模型中定义方法
// userSchema.methods.name = function() {
//     return this.displayName || this.username;
// }

// userSchema.methods.

var User = mongoose.model('User', userSchema);
module.exports = User;
