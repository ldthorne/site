'use strict';

app.directive('navbar', function ($rootScope, AuthService, AUTH_EVENTS, $state) {
    return {
        restrict: 'E',
        scope: {},
        templateUrl: 'js/common/directives/navbar/navbar.html',
        link: function (scope) {
            
            scope.user = null;

            scope.isLoggedIn = function () {
                return AuthService.isAuthenticated();
            };
            scope.addProject = () => {
                $state.go('addProject', {userId : scope.user._id});
            };

            scope.logout = function () {
                AuthService.logout()
                .then( () => {
                    $state.go('home', {}, {reload: true});
                });
            };

            const setUser = function () {
                AuthService.getLoggedInUser()
                .then( user => {
                    scope.user = user;
                    if(user){
                        scope.isUserAdmin = user.isAdmin;
                    }
                });
            };

            const removeUser = function () {
                scope.user = null;
            };

            setUser();

            $rootScope.$on(AUTH_EVENTS.loginSuccess, setUser);
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, removeUser);
            $rootScope.$on(AUTH_EVENTS.sessionTimeout, removeUser);

        }
    };
});
