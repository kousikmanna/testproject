'use strict';

angular.module('pmtoolApp')
  .controller('backlogCtrl', function ($scope,$routeParams,$location, Backlog, Task, $rootScope) {
  	
    $scope.user = $rootScope.user;

  	var getBacklog = function(){
  		Backlog.getBacklogDetails($routeParams.id)
	  	.then(function(response){
	  		$scope.backlog = response;
	  		console.log('$scope.backlog',$scope.backlog);
	  		$scope.editBacklogData = response;
	  	}).catch(function(err){
	  		$scope.error = err.message;
	  	});
  	}
  	getBacklog();


  	setTimeout(function(){$("#datepicker-backlog").datepicker({ 
		autoclose: true, 
		todayHighlight: true,
		startDate: new Date()
	}).datepicker('update', new Date())},100);

  	$scope.createBacklogTask = function (BacklogTask,duedate){
  		var data = {
  			name : BacklogTask.name,
  			description : BacklogTask.description,
  			assignedTo : BacklogTask.assignedTo,
  			status :"Not started",
  			duedate : duedate,
  			project : $scope.backlog.project.id,
  			backlog : $scope.backlog.id
  		}
  		console.log('createBacklogTask data',data);
  		Task.addTask(data)
  		.then(function(response){
  			$('#task-modal').modal('hide');
  			$scope.backlog.task.push(response);
  		}).catch(function(err){
  			$scope.error = err.message;
  		})
  	}

  	$scope.editBacklog = function (editBacklogData){
  		console.log('in edit',editBacklogData);

  		var data = {
			name : editBacklogData.name,
			description : editBacklogData.description,
		}
		var backlogId = $routeParams.id;
		console.log('data',data);
		Backlog.editBacklog(backlogId,data)
		.then(function(response){
			getBacklog();
			$('#edit-backlog-modal').modal('hide');
		}).catch(function(err){
			$scope.error = err.message;
		});
  	}

    $scope.removeBacklog = function (backlog) {
        console.log('delete backlog',backlog);
        if (window.confirm('Delete!! Are You Sure?')){
            var projectId = backlog.project.id;
            Backlog.deleteBacklog(backlog.id)
            .then(function(response){
                $location.path('/project/'+projectId);
                console.log('after delete',response);
            }).catch(function(err){
              $scope.error = err.message;
            });
        }
    }

});