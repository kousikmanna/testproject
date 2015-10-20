'use strict';

angular.module('pmtoolApp')
  .service('Sprint', function ($http, $q, $resource, $routeParams) {

  	this.fetchSprints = function(data){
  		var deferred = $q.defer();
		
		$http.post('/api/sprint', data)
		.success(function(sprints){
			deferred.resolve(sprints);
		})
		.error(function(err){
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.createSprint = function(data){
		var deferred = $q.defer();

		$http.post('/api/sprint/add', data)
		.success(function(sprint){
			deferred.resolve(sprint);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.editSprint = function(sprintId, data){
		var deferred = $q.defer();

		$http.post('/api/sprint/edit/'+sprintId, data)
		.success(function(sprint){
			deferred.resolve(sprint);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.deleteSprint = function(sprintId){
		var deferred = $q.defer();

		$http.delete('/api/sprint/'+sprintId)
		.success(function(sprint){
			deferred.resolve(sprint);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	this.getSprintDetails = function(sprintId){
		var deferred = $q.defer();

		$http.get('/api/sprint/'+sprintId)
		.success(function(sprint){
			deferred.resolve(sprint);
		})
		.error(function(err) {
			deferred.reject(err);
		});

		return deferred.promise;
	}

	// this.storeSprints = "";

  });