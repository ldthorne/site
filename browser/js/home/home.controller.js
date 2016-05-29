'use strict';

app.controller( 'HomeCtrl', function ( $scope, projects, ProjectFactory, user ) {
  $scope.user = user;
  $scope.projects = projects;
});
