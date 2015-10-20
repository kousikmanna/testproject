'use strict';

angular.module('pmtoolApp')
  .service('Project', function ($http, $q, $resource, $routeParams) {

	this.fetch = function () {
		var deferred = $q.defer();
		
		$http.get('/api/project')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

	this.add = function (data) {
		var deferred = $q.defer();
		
		$http.post('/api/project', data)
		.success(function(project){
      		$('#project-modal').modal('hide');
			deferred.resolve(project);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.delete = function (id) {
      var deferred = $q.defer();
      
      $http.delete('/api/project/'+id)
      .success(function(response){
        deferred.resolve(response);
      })
      .error(function(err){
        deferred.reject(err);
      });

      return deferred.promise;
    }

    this.fetchProject = function(id){
		var deferred = $q.defer();
		
		$http.get('/api/project/'+id)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;
  	}

  	this.fetchMyProjects = function(){
  		var deferred = $q.defer();
		
		$http.get('/api/myprojects/')
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(err){
			deferred.reject(err);
		});
		
		return deferred.promise;

  	}

  	this.addProjectMember = function (projectId,data) {
  		console.log("project",data);
  		
  		var deferred = $q.defer();
		
		$http.put('/api/project/'+projectId,data)
		.success(function(response){
			console.log(response);
      		$('#contact-list-modal').modal('hide');
			deferred.resolve(response);
		})
		.error(function(err){
			deferred.reject(err);
			// console.log(err);
		});
		
		return deferred.promise;
  	}

  	this.edit = function (userData) {
      	var deferred = $q.defer(),
            id=$routeParams.id;
      	$http.put('/api/project/'+id, userData)
      	.success(function(response){
        	deferred.resolve(response);
     	 })
      	.error(function(err) {
        	deferred.reject(err);
      	});

      return deferred.promise;
    };

    this.notify = function (data) {
    	console.log(data);
		var deferred = $q.defer();
		
		$http.post('/api/notify', data)
		.success(function(response){
      		deferred.resolve(response);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.getRole = function (id) {
      	var deferred = $q.defer();
            // id=$routeParams.id;
      	$http.get('/api/project/getRole/'+id)
      	.success(function(response){
        	deferred.resolve(response);
     	 })
      	.error(function(err) {
        	deferred.reject(err);
      	});

      return deferred.promise;
    }

    // this.storeRole = "";

});