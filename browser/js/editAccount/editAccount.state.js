'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('editAccount', {
    url: '/account',
    templateUrl: 'js/editAccount/editAccount.template.html'
  });
});
