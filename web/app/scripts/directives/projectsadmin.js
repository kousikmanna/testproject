'use strict';

angular.module('pmtoolApp')

.directive('projectsAdmin', function (Project,$location, $rootScope, $routeParams, $cookieStore, Contact) {
  	
  	// var user = $rootScope.user;
    return {
		templateUrl:'views/projectsadmin.html',
		restrict: 'E',
		
		link: function (scope, element, attrs) {
			scope.user = $rootScope.user;
			var path = $location.path();
			// if($routeParams.id){ 
				Project.fetch()
				.then(function(response){
					scope.projects = response;
				}).catch(function(err){
					scope.error = err.message;
				});
		    // }
		}
    };
  });