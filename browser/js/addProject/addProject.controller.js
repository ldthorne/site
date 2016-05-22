'use strict';

app.controller('AddProjectCtrl', function($scope, $stateParams, $state, user, $http, ProjectFactory){
    // if(user._id != $stateParams.userId) {
    //     alert('You shouldn\'t be here!')
    //     $state.go('home');
    // }

    $scope.submit = (project) => {
        ProjectFactory.createAProject(project)
        .then( res => {
            $state.go('home');
        })
        .catch( err => {
            $scope.error = err;
        })
    }
});