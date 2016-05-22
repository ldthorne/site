'use strict';

app.factory('ProjectFactory', function($http) {
	return {
		fetchAllProjects: () => {
			return $http.get('/api/projects')
			.then( res => res.data );
		},
		fetchOneProject: (projectId) => {
			return $http.get(`/api/projects/${projectId}`)
			.then( res => res.data );
		},
		createAProject: (projectData) => {
			return $http.post('/api/projects', projectData)
			.then( res => res.data );
		},
		updateAProject: (projectData) => {
			return $http.put('/api/projects', projectData)
			.then( res => res.data );
		},
		deleteAProject: (projectId) => {
			return $http.delete(`/api/projects/${projectId}`)
			.then( res => res.data );
		}
	}
});