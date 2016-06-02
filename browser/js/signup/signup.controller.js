'use strict';

app.controller('SignupCtrl', function ($scope, AuthService, $state, UserFactory) {

  $scope.login = {};
  $scope.error = null;

  $scope.createAccount = function (account) {
    $scope.error = null;
    UserFactory.createUser(account)
    .then( createdUser => {
      console.log(createdUser)
      return AuthService.login(account)
    })
    .then( () => {
        $state.go('home');
    })
    .catch( err => {
      $scope.error = err.data || err;
    });

  };

});
