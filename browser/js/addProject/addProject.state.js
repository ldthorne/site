app.config(function ($stateProvider) {
    $stateProvider.state('addProject', {
        url: '/addProject',
        templateUrl: 'js/addProject/addProject.template.html',
        controller: 'AddProjectCtrl',
        params: {userId: null},
        resolve: {
        	user: (AuthService) => {
        		return AuthService.getLoggedInUser();
        	}
        }
    });
});