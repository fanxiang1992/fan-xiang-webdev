(function(){
  angular.module("WebAppMaker")
  .factory("UserService", UserService);

  function UserService($http) {

    var api = {
      findUserByCredentials: findUserByCredentials,
      findUserById: findUserById,
      findCurrentUser: findCurrentUser,
      createUser: createUser,
      findUserByUsername: findUserByUsername,
      updateUser: updateUser,
      deleteUser: deleteUser,
      login: login,
      logout: logout,
      register: register
    };
    return api;


    function login(user) {
     return $http.post("/api/login", user);
   }

   function logout(user) {
     return $http.post("/api/logout");
   }

   function register(user) {
    return $http.post("/api/register", user);
    }

    function findUserById(userId) {
      var url = '/api/user/'+userId;
      return $http.get(url);
    }
    function findCurrentUser() {
      var url = '/api/user';
      return $http.get(url);
    }

    function findUserByCredentials(username, password) {
      var url = '/api/user?username='+username+'&password='+password;
      return $http.get(url);
    }

    function createUser(user) {
      return $http.post("/api/user", user);
    }

    function findUserByUsername(username) {
      var url = '/api/user?username='+username;
      return $http.get(url);
    }

    function updateUser(user) {
      var url = '/api/user/'+user._id;
      return $http.put(url, user);

    }

    function deleteUser(userId) {
      var url = "/api/user/" + userId;
      return $http.delete(url);
    }
  }
})();