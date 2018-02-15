
const mongoose = require('mongoose');
const User = mongoose.model("User");

const user = {
    /** 
     return true if password and confirm_password are identical
    * @param {string} pwd password
    * @param {string} confPwd confirm password
    * @return {boolean}
    **/
    isSamePasswords: function(pwd, confPwd){
        if (pwd == confPwd){
            return true;
        }else{
            return false;
        }
    },

    /**
     get user by email, return true if finded
    * @param {string} email
    * @return {boolean} 
    */
    isUserExists: function(email){
        User.findOne({'email': email},function (err, user){
            if (user){
                return true;
            }
            else{
                return false;
            }
        })
    },
}

module.exports = user;