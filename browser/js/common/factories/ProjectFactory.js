'use strict';

app.factory('ProjectFactory', function($http) {
	return {
		fetchAllProjects: () => {
			$http.get('/api/projects')
			.then( res => {
				return res.data;
			})
			.catch( console.error.bind(console) );
		},
		fetchOneProject: (projectId) => {
			$http.get(`/api/projects/${projectId}`)
			.then( res => {
				return res.data;
			})
			.catch( console.error.bind(console) );
		},
		createAProject: (projectData) => {
			$http.post('/api/projects', projectData)
			.then( res => {
				return res.data;
			})
			.catch( console.error.bind(console) );
		},
		updateAProject: (projectData) => {
			$http.put('/api/projects', projectData)
			.then( res => {
				return res.data;
			})
			.catch( console.error.bind(console) );
		},
		deleteAProject: (projectId) => {
			$http.delete(`/api/projects/${projectId}`)
			.then(res => {
				return res.data;
			})
			.catch( console.error.bind(console) );
		}
	}
});