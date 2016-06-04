'use strict';

app.controller('InitCtrl', function ($scope, UserFactory, AuthService, $state) {
  $scope.submit = user => {
  	user.isAdmin = true;
  	UserFactory.createUser(user)
    .then( createdUser => {
      return AuthService.login(user);
    })
    .then( () => {
        $state.go('home');
    })
    .catch(console.error.bind(console));
  }
});
