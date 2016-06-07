'use strict';

app.controller('HomeCtrl', function ($scope, projects, ProjectFactory, user, numUsers, $state) {
  if (!numUsers) {
    const shouldInitialize = confirm('Hey, we noticed there aren\'t any users. Want to set stuff up?');
    if (shouldInitialize) {
      $state.go('initialize');
    }
  }
  $scope.user = user;
  $scope.projects = projects;
});
