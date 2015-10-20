'use strict';

angular.module('pmtoolApp')
.controller('workspaceCtrl',function ($scope, Workspace, $rootScope, $routeParams, $location, UserService, $cookieStore) {

	$scope.user = $rootScope.user;

	var path = $location.path();
	if((path.indexOf('project')  > 0) || (path.indexOf('workspaces')  > 0) || (path.indexOf('home')  > 0)){
		Workspace.fetch().then(function(response){
			$scope.workspaces = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
    }

	$scope.addNewWorkspace = function (data) {
		Workspace.add(data).then(function(response){
			$scope.workspaces.push(response);
		}).catch(function(err){
			$scope.error = err.message;
		});
		$(".workspacename").val("");
		$('#workspace-modal').modal('hide');
	};

	$scope.deleteWorkspace = function (workspaceId) {
		if (window.confirm('Delete!! Are You Sure?')){
			Workspace.delete(workspaceId)
			.then(function(response){
				Workspace.fetch().then(function(response){
					$scope.workspaces = response;
				}).catch(function(err){
					$scope.error = err.message;
				});
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	};

	$scope.workspaceRedirect = function () {
		$('#project-modal').modal('hide');
		$('div').removeClass('modal-backdrop fade in')
		$location.path('/workspaces');
	};
})

.controller('getWorkspaceController', function ($scope, Workspace, $rootScope, $routeParams) {
	
	Workspace.fetchWorkspace($routeParams.id)
	.then(function(response){
		$scope.workspace = response;
		$scope.projects = response[0].projects;
	}).catch(function(err){
		console.log(err);
		$scope.error = err.message;
	});

	$scope.editWorkspace = function (workspaceName) {
		var data = {
			"name":workspaceName
		};
	
		Workspace.edit(data)
		.then(function(response){
			Workspace.fetchWorkspace($routeParams.id)
			.then(function(response){
				$scope.workspace = response;
				$scope.projects = response[0].projects;
			})
			.catch(function(err){
				console.log(err);
				$scope.error = err.message;
			});
			$('#edit-workspace-modal').modal('hide');
		}).catch(function(err){
			$scope.error = err.message;
			console.log($scope.error);
		});
	};
})