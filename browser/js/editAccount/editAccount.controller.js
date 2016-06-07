'use strict';

app.controller('EditAccountCtrl', function ($scope, UserFactory, user, AuthService, $state, $rootScope, $document) {
  $scope.user = user;

  $scope.submit = user => {
  	user.isAdmin = true;
  	UserFactory.updateUser(user)
    .then( createdUser => {
      //update the creatorContent and site title value across all views
      $rootScope.creatorContent = createdUser
      $document[0].title = createdUser.siteTitle;
      return AuthService.login(user);
    })
    .then( () => {
        $state.go('home');
    })
    .catch(console.error.bind(console));
  }
});
