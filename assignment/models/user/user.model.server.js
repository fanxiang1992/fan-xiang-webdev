
module.exports = function() {
    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();
    var UserModel = mongoose.model("UserModel", UserSchema);

    var api = {
        createUser: createrUser,
        findUserById: findUserById,
        updateUser:updateUser,
        getAllUser: getAllUser,
        findUserByCredentials:findUserByCredentials,
        removeUser:removeUser,
        findUserByUsername:findUserByUsername,
        findUserByFacebookId: findUserByFacebookId

    }
    return api;


    function findUserByUsername(username) {
        return UserModel.findOne({username: username});
    }

    function removeUser(userId) {
        return UserModel
            .remove({_id: userId});
    }

    function findUserByCredentials(username, password) {
        return UserModel.findOne({
            username: username,
            password: password
        })
    }

    function findUserByFacebookId(facebookId) {
      return UserModel.findOne({'facebook.id': facebookId});
    }

    function updateUser(userId, user) {
      return UserModel
      .update(
      {
        _id:userId
      },
      {
        firstName:user.firstName,
        lastName: user.lastName,
        email: user.email
      }
      );
    }

    function findUserById(userId) {
        return UserModel.findOne({_id: userId});
    }

    function createrUser(user) {
        return UserModel.create(user);
    }

    function getAllUser() {
        return UserModel.find();
    }
};