(function(){
  angular.module("WebAppMaker")
  .factory("UserService", UserService);

  function UserService() {
    var users = [
    {_id: "123", username: "alice",    password: "alice",    email: "alice@wonderland.com", firstName: "Alice",  lastName: "Wonder"  },
    {_id: "234", username: "bob",      password: "bob",      email: "bob@wonderland.com", firstName: "Bob",    lastName: "Marley"  },
    {_id: "345", username: "charly",   password: "charly",   email: "charly@wonderland.com", firstName: "Charly", lastName: "Garcia"  },
    {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@wonderland.com", firstName: "Jose",   lastName: "Annunzi" }
    ];

    var api = {
      findUserByCredentials: findUserByCredentials,
      findUserById: findUserById,
      createUser: createUser,
      findUserByUsername: findUserByUsername,
      updateUser: updateUser,
      deleteUser: deleteUser,
      allUsersCount: allUsersCount
    };
    return api;

    function findUserById(userId) {
      for(var u in users) {
        user = users[u];
        if(user._id == userId) {
          return user;
        }
      }
      return null;
    }

    function findUserByCredentials(username, password) {
      for(var u in users) {
        user = users[u];
        if(user.username === username
          && user.password === password) {
          return user;
      }
    }
    return null;
  }

  function createUser(user) {
    users.push(user);
  }

  function findUserByUsername(username) {
    for(var u in users) {
      user = users[u];
      if(user.username === username) {
        return user;
      }
    }
    return null;
  }

  function updateUser(userId, user) {
    for(var u in users) {
      oldUser = users[u];
      if(oldUser._id === userId) {
        users[u] = user;
      }
    }

  }

  function deleteUser(userId) {
    var index = -1;
    for(var u in users) {
      user = users[u];
      if(user._id === userId) {
        index = u;
        break;
      }
    }
    if (index >= 0) {
      users = users.splice(index, 1);
    }
  }

  function allUsersCount() {
    return users.length;
  }
}
})();