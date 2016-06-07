'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    templateUrl: 'js/home/home.template.html',
    controller: 'HomeCtrl',
    resolve: {
      projects: (ProjectFactory) => {
        return ProjectFactory.fetchAllProjects();
      },
      user: (AuthService) => {
        return AuthService.getLoggedInUser();
      },
      numUsers: (UserFactory) => {
        return UserFactory.getUserCount();
      }
    }
  });
});
