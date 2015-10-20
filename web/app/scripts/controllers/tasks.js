'use strict';

/**
 * @ngdoc function
 * @name pmtoolApp.controller:ActivityCtrl
 * @description
 * # ActivityCtrl
 * Controller of the pmtoolApp
 */
angular.module('pmtoolApp')
  .controller('taskPageCtrl', function ($scope,$filter,$location,Task, Project,$rootScope, $routeParams) {
	$scope.user = $rootScope.user;

	$("#datepicker").datepicker({ 
		autoclose: true, 
		todayHighlight: true,
		startDate: new Date()
	}).datepicker('update', new Date());;
	

	var path = $location.path();
	if((path.indexOf('task-page')  > 0)){ 
		Project.fetch().then(function(response){
			$scope.projects = response;
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.noTasks = false;
	var path = $location.path();
	if((path.indexOf('home')  > 0) || (path.indexOf('task-page')  > 0) || (path.indexOf('project') > 0)){ 

		Task.fetchTasks().then(function(response){
			$scope.tasks = response;
			if($scope.tasks.length == 0){
		 		$scope.noTasks = true;
			}else{
				$scope.noTasks = false;
			}
		}).catch(function(err){
			$scope.error = err.message;
		});
	}
	
	$(document).ready(function() { 
    $("#taskscroll").niceScroll({cursorwidth: '10px', autohidemode: false, zindex: 999 });
	});

	

	$scope.showAssignedTask = false;
	$scope.alltasks = true;
	$scope.showMyTask = true;
	$scope.creatingTask = false;
	$scope.dateError = false;
	// $( "#date" ).datepicker();
	



	$scope.createTask = function(name,description,project,assignedTo,duedate) {
		console.log($scope.task.duedate);
		console.log(duedate);
		
		var data = {status:"Not started",description:description,name:name,project:project,assignedTo:assignedTo,duedate:duedate};
		if(name == undefined || description == undefined || project == undefined || assignedTo == undefined || duedate == undefined ){
			alert("Please fill all details");
		}else{
			$scope.creatingTask = true;
			Task.addTask(data).then(function(response){
				$scope.tasks.push(response);
				$('#task-modal').modal('hide');
				$('.tasktitle').val("");
				$('.taskdesc').val("");
				$('.taskproject').val("");
				$('.taskassigned').val("");
				$('.date').val("");
				$scope.creatingTask = false;
			}).catch(function(err){
				$scope.error = err.message;
			});
		}
	}

	$scope.myTask = function ($event) {
		$scope.alltasks = true;
		$scope.noTasks = false;
		$scope.noTasksAssigned = false;
		$scope.inProgressShow = false;
		$scope.completedShow = false;
		// console.log("myTask",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showAssignedTask = false;
		$scope.showMyTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		// $scope.tasks = [];

		
		Task.fetchTasks().then(function(response){
			console.log(response)
			$scope.tasks = response;
			if($scope.tasks.length == 0){
	 		$scope.noTasks = true;
			}else{
				$scope.noTasks = false;
			}
		}).catch(function(err){
			$scope.error = err.message;
		});

	}

	$scope.assignedTask = function ($event) {
		$scope.noTasks = false;
		$scope.inProgressShow = false;
		$scope.completedShow = false;
		
		// console.log("assignedTaskevent",$event);
		if ($(event.target).parent().hasClass('task-head-nav')){
			$(event.target).siblings('li').removeClass('active-task');
			$(event.target).addClass('active-task');
		} else {
			$(event.target).siblings('li').removeClass('active-task-body');
			$(event.target).addClass('active-task-body');
		}
		$scope.showMyTask = false;
		$scope.showAssignedTask = true;
		$scope.alltasks = true;
		$scope.finished = false;
		$scope.progress = false;
		// $scope.tasks = [];
		
		Task.fetchTasksAssigned().then(function(response){
			$scope.tasks = response;
			if($scope.tasks.length == 0){
				$scope.noTasksAssigned = true;
			}else{
				$scope.noTasksAssigned = false;
			}
		}).catch(function(err){
			$scope.error = err.message;
		});
	}

	$scope.inProgressShow = false;

	$scope.inProgress = function ($event) {
		$scope.noTasksAssigned = false;
		$scope.noTasks = false;
		// console.log("inProgressevent",$event);
		$scope.completedShow = false;
		
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.finished = false;
		$scope.progress = true;
		$scope.inProgressTasks =[];


		angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "In progress"){
				$scope.inProgressTasks.push(task);
			}
		});

		if($scope.inProgressTasks.length == 0){
			$scope.inProgressShow = true;
		}else{
			$scope.inProgressShow = false;
		}
	}



	$scope.completedShow = false;
	$scope.completed = function ($event) {
		$scope.noTasks = false;
		$scope.noTasksAssigned = false;
		$scope.inProgressShow = false;
		
		// console.log("completedevent",$event);
		$(event.target).siblings('li').removeClass('active-task-body');
		$(event.target).addClass('active-task-body');
		$scope.alltasks = false;
		$scope.progress = false;
		$scope.finished = true;
		$scope.completedTasks = [];
		 angular.forEach($scope.tasks, function(task, idx) {
			if (task.status == "Completed"){
				$scope.completedTasks.push(task);
			}
		});
		if($scope.completedTasks.length == 0){
			$scope.completedShow = true;
		}else{
			$scope.completedShow = false;
		}
	}

	$scope.taskStatus = function (status, taskid) {
		var data = {"status":status}
		Task.statusUpdate(taskid,data).then(function(response){
		}).catch(function(err){
			$scope.error = err.message;
		});
	}


	$scope.taskDelete = function (taskid) {

		var data = {"id":taskid}

		Task.deleteTask(data).then(function(response){
			Task.fetchTasks().then(function(response){
				$scope.tasks = response;
				}).catch(function(err){
					$scope.error = err.message;
				});
			}).catch(function(err){
			$scope.error = err.message;
		});
	}

		

	// var path = $location.path();
	// if(path.indexOf('task-details') > 0){
	// 	var taskId = $routeParams.id;
	// 	console.log('taskId',taskId);
	// 	Task.fetchTaskDetails(taskId)
	// 	.then(function(response){
	// 		console.log('response',response);
	// 	}).catch(function(err){
	// 		$scope.error = err.message;
	// 	})

	// }

})

.controller('taskdetailsCtrl', function ($scope ,$location, Task, $rootScope, $routeParams, Activity) {
	var taskId = $routeParams.id;
	// console.log('taskId',taskId);
	Task.fetchTaskDetails(taskId)
	.then(function(response){
		console.log('response',response);
		$scope.task = response;
	}).catch(function(err){
		$scope.error = err.message;
	})

	$scope.addCommenttoTask = function (activity){
		var data ={
			task : $scope.task.id,
			description : activity.comment,
			project : $scope.task.project.id
		}
		console.log('data',data);
		Activity.addActivity(data)
		.then(function(response){
			console.log('add actrespaonse',response);
		}).catch(function(err){
			$scope.error = err.message;
		})
	}
})
