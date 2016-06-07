'use strict';

app.config(function ($stateProvider) {
  $stateProvider.state('initialize', {
    url: '/initialize',
    templateUrl: 'js/initialize/initialize.template.html'
  });
});
