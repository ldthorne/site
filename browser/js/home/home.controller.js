'use strict';

app.controller('HomeCtrl', function($scope, projects, ProjectFactory){

	$scope.projects = projects;
});