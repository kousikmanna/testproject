'use strict';

angular.module('pmtoolApp')
	.controller('sprintCtrl', function ($scope, $routeParams, $location, Sprint, $rootScope) {

	$scope.user = $rootScope.user;
		
	var getSprint = function(){
  		Sprint.getSprintDetails($routeParams.id)
	  	.then(function(response){
	  		$rootScope.sprint = response;
	  		// $scope.sprint = $rootScope.sprint;
	  		console.log('$rootScope.sprint',$rootScope.sprint);
	  		$scope.editSprintData = response;
	  		// $scope.backlogs = response.backlogs;
	  	}).catch(function(err){
	  		$scope.error = err.message;
	  	});
  	}
  	getSprint();

  	$scope.deleteSprint = function (sprint) {
		if (window.confirm('Delete!! Are You Sure?')){
			var projectId = sprint.project.id;
			Sprint.deleteSprint(sprint.id).then(function(response){
					$location.path('/project/'+projectId);
					console.log('after delete',response);
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}

});