'use strict';

app.controller('AddProjectCtrl', function ($scope, $state, ProjectFactory) {
  $scope.submit = (project) => {
    ProjectFactory.createAProject(project)
      .then(res => {
        $state.go('home');
      })
      .catch(console.error.bind(console));
  };
});
