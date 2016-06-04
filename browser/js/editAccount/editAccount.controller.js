'use strict';

app.controller('EditAccountCtrl', function ($scope, UserFactory, user, AuthService, $state) {
  $scope.user = user;

  $scope.submit = user => {
  	user.isAdmin = true;
  	UserFactory.updateUser(user)
    .then( createdUser => {
      return AuthService.login(user);
    })
    .then( () => {
        $state.go('home');
    })
    .catch(console.error.bind(console));
  }
});
