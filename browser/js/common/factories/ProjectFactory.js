'use strict';

app.factory('ProjectFactory', function ($http) {
  return {
    fetchAllProjects: () => {
      return $http.get('/api/projects')
      .then(res => res.data);
    },
    fetchOneProject: (projectId) => {
      return $http.get(`/api/projects/${projectId}`)
      .then(res => res.data);
    },
    createAProject: (projectData) => {
      return $http.post('/api/projects', projectData)
      .then(res => res.data);
    },
    updateAProject: (projectData) => {
      return $http.put('/api/projects', projectData)
      .then(res => res.data);
    },
    deleteAProject: (projectData) => {
      //angular's $http delete request doesn't allow for a body to be sent unless configured as such 
      return $http({
        method: 'DELETE',
        url: '/api/projects/',
        data: projectData,
        headers: {'Content-Type': 'application/json;charset=utf-8'}
      })
      .then(res => res.data);
    }
  };
});
