'use strict';

app.controller('EditProjectCtrl', function ($scope, $state, ProjectFactory, $stateParams, user) {
  if (!user || !user.isAdmin) {
    alert('You are not an authorized user. Please log in and try again.');
    $state.go('home');
  }
  const project = $stateParams.project;

  //need to cast the endDate to a date format from string  
  if (project.endDate) {
    project.endDate = new Date(project.endDate);
  }
  //project will always have a startDate
  project.startDate = new Date(project.startDate);

  $scope.project = project;  

  $scope.submit = (project) => {
    project.userId = user._id;
    ProjectFactory.updateAProject(project)
    .then(res => {
      $state.go('home');
    })
    .catch(console.error.bind(console));
  };
});
