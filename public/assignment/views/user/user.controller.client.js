(function(){
  angular.module("WebAppMaker")
  .controller("LoginController", LoginController);

  function LoginController($location, UserService) {
    var vm = this;
    vm.login = login;

    function login(user) {
      if(!user || !user.username || !user.password) {
        vm.error = "Username or Password can't be empty";
        return;
      }

      var user = UserService.findUserByCredentials(user.username, user.password);
      if(user === null) {
        vm.error = "No such user";
      } else {
        $location.url("/user/" + user._id);
      }
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("RegisterController", RegisterController);

  function RegisterController($routeParams, UserService, $location) {
    var vm = this;
    vm.register = register;

    function register(user) {
      //check input field empty
      if(!user || !user.username || !user.password || !user.password2) {
        vm.error = "Username or Password can't be empty";
        return;
      }

      //check password matching
      if(user.password != user.password2) {
        vm.error = "Password don't match";
        return;
      }

      var user = {
        _id: (456 + UserService.allUsersCount() - 3).toString(),
        username: user.username,
        password: user.password
      }

      UserService.createUser(user);
      $location.url("/user/" + user._id);
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("ProfileController", ProfileController);

  function ProfileController($routeParams, UserService) {
    var vm = this;
    vm.userId = parseInt($routeParams.uid);

    function init() {
      vm.user = UserService.findUserById(vm.userId);
    }

    init();
  }
})();