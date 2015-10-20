'use strict';

angular.module('pmtoolApp')
  .service('Task', function ($http, $q, $resource, $routeParams) {
    // AngularJS will instantiate a singleton by calling "new" on this function
    this.addTask = function (task) {
      	var deferred = $q.defer()
            
      	$http.post('/api/task/add', task)
      	.success(function(response){
        	deferred.resolve(response);
        	console.log(response);
     	 })
      	.error(function(err) {
        	deferred.reject(err);
      	});

      return deferred.promise;
    };

    this.fetchTasks = function(){
		var deferred = $q.defer();
		
		$http.get('/api/task/get')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

	this.fetchTaskDetails = function(taskId){
		var deferred = $q.defer();
		
		$http.get('/api/task/taskDetails/'+taskId)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}  	

  	this.statusUpdate = function (taskid, data) {
		var deferred = $q.defer();
		console.log(data);

		$http.put('/api/task/edit/'+ taskid, data)
		.success(function(data){
			console.log("success");
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}


  	this.fetchTasksAssigned = function(){
		var deferred = $q.defer();
		
		$http.get('/api/task/assignedTask')

		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  	this.deleteTask = function(data){
  		var deferred = $q.defer();

  		$http.delete('/api/task/'+data.id)
  		.success(function(data){
			deferred.resolve(data);
			console.log("task deleted succesfully");
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  });
