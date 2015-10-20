'use strict';

angular.module('pmtoolApp')
  .directive('myProjects', function (UserService,Project,$location,$routeParams) {
    return {
		templateUrl:'views/my-projects.html',
		restrict: 'E',
		scope: {
			projects: '=projects'
			
		},
		
		link: function (scope, element, attrs) {


			UserService.fetchProfile()
			.then(function(response){
				scope.projects = response.projects;
				// console.log("projects",scope.projects);
			}).catch(function(err){
				scope.error = err.message;				
			});

			var path = $location.path();
			if($routeParams.id){ 
				Project.fetchMyProjects().then(function(response){
				scope.myprojects = response;
				// console.log("scope.myprojects",scope.myprojects);
				}).catch(function(err){
				scope.error = err.message;
				});
			}
		}
    };
});
