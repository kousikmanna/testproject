'use strict';

angular.module('pmtoolApp')
  .directive('myWorkspaces', function (Workspace,$rootScope) {
    return {
      templateUrl: 'views/my-workspaces.html',
      restrict: 'E',
      
      link: function(scope, element, attrs) {
        scope.user = $rootScope.user;
  		Workspace.fetchMyWorkspace()
  		.then(function(response){
  			scope.myWorkspaces = response;
  		})
  		.catch(function(err){
  			scope.error = err.message;
  		});
        }
      };
  });