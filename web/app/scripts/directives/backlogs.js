'use strict';

angular.module('pmtoolApp')
  .directive('backlogs', function ($location, $routeParams, $rootScope, Backlog, Sprint, Project) {
    return {
		templateUrl:'views/backlogs.html',
		restrict: 'E',
		// scope : {
		// 	sprint :'='
		// },
		link: function(scope, element, attrs) {

			scope.user = $rootScope.user;
			var path = $location.path();
			// setTimeout(function(){
			// scope.sprints = Sprint.storeSprints;
			// console.log('scope.sprints',scope.sprints);
			// },200)
			// console.log('rootscope getrole',$rootScope.myRole);
			// console.log('$rootScope.sprint',$rootScope.sprint);

			if (attrs.type == 'sprintPage'){
				setTimeout(function(){
					var projectId = $rootScope.sprint.project.id;
					console.log('asdadf',projectId);
					Project.getRole(projectId)
					.then(function(response){
						console.log('response',response);
						$rootScope.myRole = response.role;
						console.log('response getrole',$rootScope.myRole);
					}).catch(function(err){
						console.log(err);
						scope.error = err.message;
					});
				},100)
			}

			

			var fetchBacklogs = function(data){
				Backlog.fetchBacklogs(data)
				.then(function(response){
					scope.backlogs = response;
					console.log('scope.backlogs',scope.backlogs);
				}).catch(function(err){
					scope.error = err.message;
				});
			}
			if (attrs.type == 'projectPage'){
				var data = {
					project : $routeParams.id
				}
				console.log('inproject page');
				fetchBacklogs(data);
			} else if(attrs.type == 'sprintPage') {
				var data = {
					sprint : $routeParams.id
				}
				console.log('inside sprint page',data);
				fetchBacklogs(data);
			}
			scope.createBacklog = function(backlog){
				console.log('in createBacklog');
				if (attrs.type == 'projectPage'){
					var data = {
						name : backlog.name,
						description : backlog.description,
						project : $routeParams.id
					}
				} else if(attrs.type == 'sprintPage') {
					var data = {
						name : backlog.name,
						description : backlog.description,
						project : $rootScope.sprint.project.id,
						sprint : $routeParams.id
					}
				}
				console.log('data',data);
				Backlog.createBacklog(data)
				.then(function(response){
					scope.backlogs.push(response);
					$('#create-backlog-modal').modal('hide');
				}).catch(function(err){
					scope.error = err.message;
				});
			}

			scope.changeSprint = function(sprintId,backlog){
				// console.log('changeSprint sprint-->',sprint);
				console.log('changeSprint backlog-->',backlog);
				var backllogId = backlog.id;
				var data = {
					sprint : sprintId
				}
				console.log('data',data);
				Backlog.editBacklog(backllogId,data)
				.then(function(response){
					console.log('changeSprint resp',response);
				}).catch(function(err){
					scope.error = err.message;
				})
			}
		}
    };
  });
