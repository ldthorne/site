'use strict';

app.directive('accountInfo', function ($rootScope, AuthService, $state, UserFactory, $document) {
  
  return {
    restrict: 'E',
    scope: {},
    templateUrl: 'js/common/directives/accountInfo/accountInfo.html',
    link: function (scope) {
    	
    	AuthService.getLoggedInUser()
    	.then( user => {
    		scope.user = user;
    	});

    	let numUsers;

    	UserFactory.getUserCount()
    	.then(numberOfUsers => {
    		numUsers = numberOfUsers;
    		if(numUsers) {
    			scope.buttonText = 'Update Account';
    		} else {
    			scope.buttonText = 'Create Account';
    		}
    	});

      scope.submit = user => {
        if (user.favicon) {
          $rootScope.changeFavicon(user.favicon);
        }
        user.isAdmin = true;
        const updateOrCreate = numUsers ? UserFactory.updateUser : UserFactory.createUser;
        updateOrCreate(user)
        .then(createdOrUpdatedUser => {
          //update the creatorContent and site title value across all views
          $rootScope.creatorContent = createdOrUpdatedUser;
          $document[0].title = createdOrUpdatedUser.siteTitle;
          return AuthService.login(user);
        })
        .then(() => {
          $state.go('home');
        })
        .catch(console.error.bind(console));
      };

    }
  };

});
