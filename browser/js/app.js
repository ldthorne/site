'use strict';
window.app = angular.module('ThorneSite', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'ngSanitize', 'ngMaterial']);

app.config(function ($urlRouterProvider, $locationProvider) {
  // This turns off hashbang urls (/#about) and changes it to something normal (/about)
  $locationProvider.html5Mode(true);
  // If we go to a URL that ui-router doesn't have registered, go to the "/" url.
  $urlRouterProvider.otherwise('/');
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state, $document, UserFactory) {
  $rootScope.changeFavicon = (url) => {
    const link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);
  };

  UserFactory.getCreator()
  .then(user => {
    $rootScope.creatorContent = user;
    if(user.favicon){
      $rootScope.changeFavicon(user.favicon);
    }
    //sets the title of the webpage
    $document[0].title = $rootScope.creatorContent.siteTitle || 'Set the title in settings!';
  });


  // The given state requires an authenticated user.
  const destinationStateRequiresAuth = function (state) {
    return state.data && state.data.authenticate;
  };

  // $stateChangeStart is an event fired
  // whenever the process of changing a state begins.
  $rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

    if (!destinationStateRequiresAuth(toState)) {
      // The destination state does not require authentication
      // Short circuit with return.
      return;
    }

    if (AuthService.isAuthenticated()) {
      // The user is authenticated.
      // Short circuit with return.
      return;
    }

    // Cancel navigating to new state.
    event.preventDefault();

    AuthService.getLoggedInUser().then(function (user) {
      // If a user is retrieved, then renavigate to the destination
      // (the second time, AuthService.isAuthenticated() will work)
      // otherwise, if no user is logged in, go to "login" state.
      if (user) {
        $state.go(toState.name, toParams);
      } else {
        $state.go('login');
      }
    });

  });

});
