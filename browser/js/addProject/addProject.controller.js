'use strict';

app.controller('AddProjectCtrl', function ($scope, $state, ProjectFactory, user) {
  if (!user || !user.isAdmin) {
    alert('You are not an authorized user. Please log in and try again.');
    $state.go('home');
  }
  $scope.submit = (project) => {
    ProjectFactory.createAProject(project)
    .then(res => {
      $state.go('home');
    })
    .catch(console.error.bind(console));
  };
});
