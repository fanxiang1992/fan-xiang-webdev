(function(){
  angular.module("WebAppMaker")
  .controller("LoginController", LoginController);

  function LoginController($location,$rootScope,UserService) {
    var vm = this;
    vm.login = login;

    function login(user) {
      if(!user || !user.username || !user.password) {
        vm.error = "Username or Password can't be empty";
        return;
      }
      UserService.login(user).then(function(response) {
        var user = response.data;
        $rootScope.currentUser = user;
        $location.url("/user/"+user._id);
      });

      // var promise = UserService.findUserByCredentials(user.username, user.password);
      // promise
      // .success(function(user){
      //   if(user === '0') {
      //     vm.error = "No such user";
      //   } else {
      //     console.log(user._id);
      //     $location.url("/user/" + user._id);
      //   }
      // })
      // .error(function(bbbb){
      //   console.log(bbbb);
      // });
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("RegisterController", RegisterController);

  function RegisterController($routeParams, UserService, $location,$rootScope) {
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
        username: user.username,
        password: user.password
      }

      
      UserService
      .register(user)
      .then(
        function(response) {
          var user = response.data;
          $rootScope.currentUser = user;
          $location.url("/user/"+user._id);
        });
    }
  }
})();

(function(){
  angular.module("WebAppMaker")
  .controller("ProfileController", ProfileController);

  function ProfileController($routeParams, UserService,$rootScope,$location) {
    var vm = this;
    vm.userId = $routeParams.uid;
    vm.updateUser = updateUser;
    vm.unregisterUser = unregisterUser;
    vm.logout = logout;

    function init() {
      if (vm.userId) {
        UserService.findUserById(vm.userId).success(function(user){
          if(user != '0') {
            vm.user = user;
          }
        }).error(function(){
          console.log("findUserById-error");
        });
      } else {
        UserService.findCurrentUser()
        .success(function(user){
          if(user != '0') {
            vm.user = user;
            vm.userId = user._id;
          }
        })
        .error(function(){
          console.log("findUserById-error");
        });
      }
    }
    init();

    function logout() {
      UserService.logout().then(function(response) {
        $rootScope.currentUser = null;
        $location.url("/");
      });
    }

    function updateUser() {
      UserService.updateUser(vm.user);
    }

    function unregisterUser() {
      UserService
      .unregisterUser(vm.user._id)
      .success(function(){
        $location.url("/login");
      })
      .error(function(){

      });
    }
  }
})();