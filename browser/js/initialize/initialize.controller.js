'use strict';

app.controller('InitCtrl', function ($scope, UserFactory, AuthService, $state, $rootScope, $document) {
  $scope.submit = user => {
  	user.isAdmin = true;
  	UserFactory.createUser(user)
    .then( createdUser => {
      $rootScope.creatorContent = createdUser;
      $document[0].title = createdUser.siteTitle;
      return AuthService.login(user);
    })
    .then( () => {
      $state.go('home');
    })
    .catch(console.error.bind(console));
  }
});
