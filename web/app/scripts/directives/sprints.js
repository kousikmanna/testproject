'use strict';

angular.module('pmtoolApp')
  .directive('sprints', function ($location, $routeParams, Sprint, $rootScope, Project) {
    return {
		templateUrl:'views/sprints.html',
		restrict: 'E',

		// scope :{
		// 	sprint : '='
		// },

		link: function(scope, element, attrs) {

			// setTimeout(function(){scope.myRole = Project.storeRole.role;},200);

			// Project.getRole($routeParams.id)
		 //    	.then(function(response){
			// 		scope.myRole = response.role;

			// 		console.log('rootscope getrole',scope.myRole);
			// 	}).catch(function(err){
			// 		console.log(err);
			// 		$scope.error = err.message;
			// 	});
			setTimeout(function(){$("#datepicker-sprint-start").datepicker({ 
				autoclose: true, 
				todayHighlight: true,
				startDate: new Date()
			}).datepicker('update', new Date())},100);

			setTimeout(function(){$("#datepicker-sprint-end").datepicker({ 
				autoclose: true, 
				todayHighlight: true,
				startDate: new Date()
			}).datepicker('update', new Date())}, 100);

			var data ={
				project : $routeParams.id
			}
			console.log('data',data);
			Sprint.fetchSprints(data)
			.then(function(response){
				scope.sprints = response;
				Sprint.storeSprints = response;
				console.log(scope.sprints);
			}).catch(function(err){
				scope.error = err.message;
			});


			scope.createSprint = function(sprint){
				var data = {
					name : sprint.name,
					startDate : sprint.startDate,
					endDate : sprint.endDate,
					project : $routeParams.id
				}
				// console.log('data',data);
				Sprint.createSprint(data)
				.then(function(response){
					scope.sprints.push(response);
					$('#create-sprint-modal').modal('hide');
				}).catch(function(err){
					scope.error = err.message;
				});
			}
		}
    };
  });
