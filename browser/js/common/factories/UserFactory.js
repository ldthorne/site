'use strict';

app.factory('UserFactory', function($http){
  return {
    createUser: (account) => {
      return $http.post('/api/users', account)
      .then( res => res.data);
    },
    getUserCount: () => {
      return $http.get('/api/users')
      .then( res => res.data);
    },
    getCreator: () => {
      return $http.get('/api/users/admin')
      .then( res => res.data);
    },
    updateUser: (user) => {
      return $http.put('/api/users', user)
      .then( res => res.data);
    }
  }
});