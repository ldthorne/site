'use strict';

app.directive('project', function (AuthService, ProjectFactory, $state) {
  return {
    restrict: 'E',
    scope: {
      project: '=project'
    },
    transclude: true,
    templateUrl: 'js/common/directives/project/project.html',
    link: function (scope) {
      AuthService.getLoggedInUser()
      .then(user => {
        scope.user = user;
        if (user) {
          scope.isUserAdmin = user.isAdmin;
        }
      });

      scope.remove = function (project) {
        project.userId = scope.user._id
        ProjectFactory.deleteAProject(project)
        .then(() => {
          $state.go('home', {}, { reload: true });
        })
        .catch(console.error.bind(console));
      };

      scope.edit = function(project) {
        $state.go('edit', {project});
      };
    }
  };
});
