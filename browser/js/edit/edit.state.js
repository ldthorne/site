app.config(function ($stateProvider) {
  $stateProvider.state('edit', {
    url: '/edit',
    templateUrl: 'js/edit/edit.template.html',
    controller: 'EditProjectCtrl',
    params: { project: null },
    resolve: {
      user: (AuthService) => {
        return AuthService.getLoggedInUser();
      }
    }
  });
});
